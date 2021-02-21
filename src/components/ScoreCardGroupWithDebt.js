import React, { useEffect, useState } from "react";
import {
  TARGET_ALL_GROUPS_DATE,
  TARGET_ALL_GROUPS_INDIVIDUALS,
  TARGET_ADULT_POPULATION_DATE,
  TARGET_ADULT_POPULATION_INDIVIDUALS,
} from "../data/ImportantValues";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import moment from "moment";

import ScoreCardWithDebt from "./ScoreCardWithDebt";

const ScoreCardGroupWithDebt = ({ parsedData }) => {
  const [debtData, setDebtData] = useState(null);

  const predictDebtIntoFuture = (
    data,
    allDosesRate,
    firstDosesColumn,
    maxFirstDoses,
    initialCumFirstDoses,
    initialCumSecondDoses
  ) => {
    let carryOver = 0;
    let secondDosesDue = 0;

    let cumFirstDoses = 0;
    let cumSecondDoses = 0;

    const debtData_ = data.map((datum, index) => {
      // Debt from first doses (from 12 weeks prior) and carry over from previous day added to total number of second doses due
      secondDosesDue += datum[firstDosesColumn] + carryOver;

      let secondDosesDueRecord = secondDosesDue;
      let carryOverRecord = carryOver;

      let secondDosesDone = 0;

      if (
        index > 0 &&
        cumFirstDoses >= maxFirstDoses &&
        cumSecondDoses <= maxFirstDoses
      ) {
        secondDosesDone = allDosesRate;
      } else {
        if (secondDosesDue >= allDosesRate) {
          secondDosesDone = allDosesRate;
          carryOver = secondDosesDue - allDosesRate;
        } else {
          secondDosesDone = secondDosesDue;
          carryOver = 0;
        }
      }

      let spareCapacity = allDosesRate - secondDosesDone;
      let firstDosesDone = 0;

      if (spareCapacity > 0 && cumFirstDoses <= maxFirstDoses)
        firstDosesDone = spareCapacity;

      secondDosesDue -= secondDosesDue;

      if (index == 0) {
        if (initialCumFirstDoses && initialCumSecondDoses) {
          cumFirstDoses = initialCumFirstDoses;
          cumSecondDoses = initialCumSecondDoses;
        } else {
          cumFirstDoses = firstDosesDone;
          cumSecondDoses = secondDosesDone;
        }
      } else {
        cumFirstDoses += firstDosesDone;
        cumSecondDoses += secondDosesDone;
      }

      return {
        date: moment(datum["date"]).add(12, "weeks").format("YYYY-MM-DD"),
        secondDosesDone: secondDosesDone,
        firstDosesDone: firstDosesDone,
        secondDosesCarryOverFromPreviousDay: carryOverRecord,
        secondDosesNewFromDay: datum[firstDosesColumn],
        spareCapacity: spareCapacity,
        secondDosesDue: secondDosesDueRecord,
        cumFirstDoses: cumFirstDoses,
        cumSecondDoses: cumSecondDoses,
      };
    });

    return debtData_;
  };

  const fillDataWithConstantRate = (
    initialData,
    daysToFill,
    rate,
    cumFirstDosesColumn,
    cumSecondDosesColumn,
    maxFirstDoses
  ) => {
    let fillData = [];

    let cumFirstDoses = 0;
    let cumSecondDoses = 0;

    for (let i = 1; i < daysToFill; i++) {
      let maxFirstDosesReached = false;
      let maxSecondDosesReached = false;

      if (i == 1) {
        if (
          initialData[initialData.length - 1][cumFirstDosesColumn] >=
          maxFirstDoses
        )
          maxFirstDosesReached = true;
        if (
          initialData[initialData.length - 1][cumSecondDosesColumn] >=
          maxFirstDoses
        )
          maxSecondDosesReached = true;

        if (!maxFirstDosesReached && !maxSecondDosesReached) {
          cumFirstDoses =
            initialData[initialData.length - 1][cumFirstDosesColumn] + rate;
          cumSecondDoses =
            initialData[initialData.length - 1][cumSecondDosesColumn];
        } else if (!maxFirstDosesReached && maxSecondDosesReached) {
          cumFirstDoses =
            initialData[initialData.length - 1][cumFirstDosesColumn] + rate;
          cumSecondDoses =
            initialData[initialData.length - 1][cumSecondDosesColumn];
        } else if (maxFirstDosesReached && !maxSecondDosesReached) {
          cumFirstDoses =
            initialData[initialData.length - 1][cumFirstDosesColumn];
          cumSecondDoses =
            initialData[initialData.length - 1][cumSecondDosesColumn] + rate;
        } else if (maxFirstDosesReached && maxSecondDosesReached) {
          cumFirstDoses =
            initialData[initialData.length - 1][cumFirstDosesColumn];
          cumSecondDoses =
            initialData[initialData.length - 1][cumSecondDosesColumn];
        } else {
          console.log("Should never reach this");
        }
      } else {
        if (cumFirstDoses >= maxFirstDoses) maxFirstDosesReached = true;
        if (cumSecondDoses >= maxFirstDoses) maxSecondDosesReached = true;

        if (!maxFirstDosesReached && !maxSecondDosesReached)
          cumFirstDoses += rate;
        else if (!maxFirstDosesReached && maxSecondDosesReached)
          cumFirstDoses += rate;
        else if (maxFirstDosesReached && !maxSecondDosesReached)
          cumSecondDoses += rate;
        else if (maxFirstDosesReached && maxSecondDosesReached) {
          // do nothing
        } else console.log("Should never reach this");
      }

      fillData.push({
        date: moment(initialData[initialData.length - 1].date)
          .add(i, "day")
          .format("YYYY-MM-DD"),
        secondDosesDone: 0,
        firstDosesDone: rate,
        secondDosesCarryOverFromPreviousDay: 0,
        secondDosesNewFromDay: 0,
        spareCapacity: rate,
        secondDosesDue: 0,
        cumFirstDoses: cumFirstDoses,
        cumSecondDoses: cumSecondDoses,
      });
    }

    return fillData;
  };

  useEffect(() => {
    if (parsedData) {
      const RATE =
        parsedData[parsedData.length - 1].sevenDaysRate +
        parsedData[parsedData.length - 1].sevenDaysRateSecond;

      // IS THIS ALWAYS 44??????? NEED TO MAKE IT DYNAMIC

      const fillingDays =
        Math.abs(
          moment(parsedData[parsedData.length - 1].date).diff(
            moment(parsedData[0].date).add(12, "weeks"),
            "days"
          )
        ) + 1;

      const fillData1 = fillDataWithConstantRate(
        parsedData,
        fillingDays,
        RATE,
        "cumPeopleVaccinatedFirstDoseByPublishDate",
        "cumPeopleVaccinatedSecondDoseByPublishDate",
        53000000
      );

      let debtData_ = predictDebtIntoFuture(
        parsedData,
        RATE,
        "newPeopleVaccinatedFirstDoseByPublishDate",
        53000000,
        fillData1[fillData1.length - 1]["cumFirstDoses"],
        fillData1[fillData1.length - 1]["cumSecondDoses"]
      );

      debtData_.shift(); // First element does not contain a new vaccination rate

      const fillData2 = fillDataWithConstantRate(
        debtData_,
        fillingDays,
        RATE,
        "cumFirstDoses",
        "cumSecondDoses",
        53000000
      );

      let debtData_2 = predictDebtIntoFuture(
        debtData_,
        RATE,
        "firstDosesDone",
        53000000,
        fillData2[fillData2.length - 1]["cumFirstDoses"],
        fillData2[fillData2.length - 1]["cumSecondDoses"]
      );

      const fillData3 = fillDataWithConstantRate(
        debtData_2,
        fillingDays,
        RATE,
        "cumFirstDoses",
        "cumSecondDoses",
        53000000
      );

      let debtData_3 = predictDebtIntoFuture(
        debtData_2,
        RATE,
        "firstDosesDone",
        53000000,
        fillData3[fillData3.length - 1]["cumFirstDoses"],
        fillData3[fillData3.length - 1]["cumSecondDoses"]
      );

      const allDebtData = [
        ...fillData1,
        ...debtData_,
        ...fillData2,
        ...debtData_2,
        ...fillData3,
        ...debtData_3,
      ];

      // console.log(fillData1);
      // console.log(debtData_);
      // console.log(fillData2);
      // console.log(debtData_2);

      setDebtData(allDebtData);
    }
  }, [parsedData]);

  return (
    <Grid stackable centered columns={3}>
      <Grid.Row textAlign="center" centered>
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ALL_GROUPS_DATE}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
        />
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ADULT_POPULATION_DATE}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="Adult Population"
        />
      </Grid.Row>
    </Grid>
  );
};
export default ScoreCardGroupWithDebt;
