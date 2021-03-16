import _ from "lodash";
import moment from "moment";
moment.locale("en-gb");

export const computeAverageRate = (data, days, fromKey, toKey) => {
  data.forEach((datum, index) => {
    if (index >= 6) {
      data[index][toKey] = _.mean(
        data.slice(index - (days - 1), index + 1).map((a) => a[fromKey])
      );
    } else data[index][toKey] = null;
  });

  return data;
};

export const predictDebtIntoFuture = (
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

export const fillDataWithConstantRate = (
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
  let firstDosesDone = 0;
  let secondDosesDone = 0;

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

      if (!maxFirstDosesReached && !maxSecondDosesReached) {
        cumFirstDoses += rate;
        firstDosesDone = rate;
        secondDosesDone = 0;
      } else if (!maxFirstDosesReached && maxSecondDosesReached) {
        cumFirstDoses += rate;
        firstDosesDone = rate;
        secondDosesDone = 0;
      } else if (maxFirstDosesReached && !maxSecondDosesReached) {
        cumSecondDoses += rate;
        firstDosesDone = 0;
        secondDosesDone = rate;
      } else if (maxFirstDosesReached && maxSecondDosesReached) {
        // do nothing
      } else console.log("Should never reach this");
    }

    fillData.push({
      date: moment(initialData[initialData.length - 1].date)
        .add(i, "day")
        .format("YYYY-MM-DD"),
      secondDosesDone: secondDosesDone,
      firstDosesDone: firstDosesDone,
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

export const addWeekField = (data) => {
  return data.map((datum) => {
    datum.week = moment(datum.date).week();
    return datum;
  });
};

export const convertToWeeklyData = (data) => {
  const fieldsToAverage = [
    "cumFirstDoses",
    "cumSecondDoses",
    "firstDosesDone",
    "secondDosesDone",
    "spareCapacity",
  ];

  const weeklyData = [];

  const minWeek = data[0].week;
  const maxWeek = data[data.length - 1].week;

  for (let i = minWeek; i <= maxWeek; i++) {
    const filteredData = data.filter((item) => item.week === i);

    let weekData = {};

    fieldsToAverage.forEach((field) => {
      weekData[field] = _.meanBy(filteredData, field);
    });

    weekData["week"] = i;

    weekData["weekFirstDay"] = moment({ y: "2021" }) // get first day of the given year
      .week(i) // get the first week according locale
      .startOf("week") // get the first day of the week according locale
      .format("YYYY-MM-DD");
    weeklyData.push(weekData);
  }

  return weeklyData;
};
