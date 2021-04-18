import _, { forEach } from "lodash";
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

  const years = _.uniq(_.map(data, "year"));

  years.forEach((year) => {
    const filteredByYear = data.filter((item) => item.year == year);
    const weeks = _.uniq(_.map(filteredByYear, "week"));

    weeks.forEach((week) => {
      const filteredData = data.filter(
        (item) => item.week === week && item.year == year
      );

      let weekData = {};

      fieldsToAverage.forEach((field) => {
        weekData[field] = _.meanBy(filteredData, field);
      });

      const predicted = _.some(filteredData, { predicted: true });

      weekData["week"] = week;

      weekData.predicted = predicted;

      weekData["weekFirstDay"] = moment({ y: year }) // get first day of the given year
        .week(week) // get the first week according locale
        .startOf("week") // get the first day of the week according locale
        .format("YYYY-MM-DD");

      weeklyData.push(weekData);
    });
  });

  return weeklyData;
};

export const computeStatistics = (parsedData) => {
  const latestIndex = parsedData.length - 1;

  let statistics = {};

  statistics.allDosesStatistics = {
    total:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"],
    totalDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] -
      (parsedData[latestIndex - 1][
        "cumPeopleVaccinatedFirstDoseByPublishDate"
      ] +
        parsedData[latestIndex - 1][
          "cumPeopleVaccinatedSecondDoseByPublishDate"
        ]),
    totalDayOnDayPercent:
      (parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
        parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"]) /
        (parsedData[latestIndex - 1][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ] +
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ]) -
      1,
    totalWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] -
      (parsedData[latestIndex - 7][
        "cumPeopleVaccinatedFirstDoseByPublishDate"
      ] +
        parsedData[latestIndex - 7][
          "cumPeopleVaccinatedSecondDoseByPublishDate"
        ]),
    totalWeekOnWeekPercent:
      (parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
        parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"]) /
        (parsedData[latestIndex - 7][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ] +
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ]) -
      1,
    new:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"],
    newDayOnDayPercent:
      (parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
        parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"]) /
        (parsedData[latestIndex - 1][
          "newPeopleVaccinatedFirstDoseByPublishDate"
        ] +
          parsedData[latestIndex - 1][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ]) -
      1,
    newDayOnDay:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] -
      (parsedData[latestIndex - 1][
        "newPeopleVaccinatedFirstDoseByPublishDate"
      ] +
        parsedData[latestIndex - 1][
          "newPeopleVaccinatedSecondDoseByPublishDate"
        ]),
    newWeekOnWeek:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] -
      (parsedData[latestIndex - 7][
        "newPeopleVaccinatedFirstDoseByPublishDate"
      ] +
        parsedData[latestIndex - 7][
          "newPeopleVaccinatedSecondDoseByPublishDate"
        ]),
    newWeekOnWeekPercent:
      (parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
        parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"]) /
        (parsedData[latestIndex - 7][
          "newPeopleVaccinatedFirstDoseByPublishDate"
        ] +
          parsedData[latestIndex - 7][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ]) -
      1,
    completedCourses:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"],
    completedCoursesWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 7][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        parsedData[latestIndex - 7][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ],
    completedCoursesDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 1][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        parsedData[latestIndex - 1][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ],
    sevenDaysRate:
      parsedData[latestIndex]["sevenDaysRate"] +
      parsedData[latestIndex]["sevenDaysRateSecond"],
    sevenDaysRateDayOnDay:
      parsedData[latestIndex]["sevenDaysRate"] +
      parsedData[latestIndex]["sevenDaysRateSecond"] -
      parsedData[latestIndex - 1]["sevenDaysRate"] +
      parsedData[latestIndex - 1]["sevenDaysRateSecond"],

    sevenDaysRateDayOnDayPercent:
      (parsedData[latestIndex]["sevenDaysRate"] +
        parsedData[latestIndex]["sevenDaysRateSecond"]) /
        (parsedData[latestIndex - 1]["sevenDaysRate"] +
          parsedData[latestIndex - 1]["sevenDaysRateSecond"]) -
      1,
    sevenDaysRateWeekOnWeek:
      parsedData[latestIndex]["sevenDaysRate"] +
      parsedData[latestIndex]["sevenDaysRateSecond"] -
      parsedData[latestIndex - 7]["sevenDaysRate"] +
      parsedData[latestIndex - 7]["sevenDaysRateSecond"],

    sevenDaysRateWeekOnWeekPercent:
      (parsedData[latestIndex]["sevenDaysRate"] +
        parsedData[latestIndex]["sevenDaysRateSecond"]) /
        (parsedData[latestIndex - 7]["sevenDaysRate"] +
          parsedData[latestIndex - 7]["sevenDaysRateSecond"]) -
      1,
  };

  statistics.firstDosesStatistics = {
    total: parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"],
    totalDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 1]["cumPeopleVaccinatedFirstDoseByPublishDate"],

    totalDayOnDayPercent:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        parsedData[latestIndex - 1][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ] -
      1,
    totalWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 7]["cumPeopleVaccinatedFirstDoseByPublishDate"],

    totalWeekOnWeekPercent:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        parsedData[latestIndex - 7][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ] -
      1,
    new: parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"],
    newDayOnDay:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 1]["newPeopleVaccinatedFirstDoseByPublishDate"],
    newDayOnDayPercent:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] /
        parsedData[latestIndex - 1][
          "newPeopleVaccinatedFirstDoseByPublishDate"
        ] -
      1,
    newWeekOnWeek:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] -
      parsedData[latestIndex - 7]["newPeopleVaccinatedFirstDoseByPublishDate"],
    newWeekOnWeekPercent:
      parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] /
        parsedData[latestIndex - 7][
          "newPeopleVaccinatedFirstDoseByPublishDate"
        ] -
      1,
    sevenDaysRate: parsedData[latestIndex]["sevenDaysRate"],
    sevenDaysRateDayOnDay:
      parsedData[latestIndex]["sevenDaysRate"] -
      parsedData[latestIndex - 1]["sevenDaysRate"],

    sevenDaysRateDayOnDayPercent:
      parsedData[latestIndex]["sevenDaysRate"] /
        parsedData[latestIndex - 1]["sevenDaysRate"] -
      1,
    sevenDaysRateWeekOnWeek:
      parsedData[latestIndex]["sevenDaysRate"] -
      parsedData[latestIndex - 7]["sevenDaysRate"],

    sevenDaysRateWeekOnWeekPercent:
      parsedData[latestIndex]["sevenDaysRate"] /
        parsedData[latestIndex - 7]["sevenDaysRate"] -
      1,
    adultPopulationDone:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
      53000000,
    adultPopulationDoneDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        53000000 -
      parsedData[latestIndex - 1]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        53000000,
    adultPopulationDoneWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        53000000 -
      parsedData[latestIndex - 7]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        53000000,
    priorityGroupsDone:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
      32000000,
    priorityGroupsDoneDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        32000000 -
      parsedData[latestIndex - 1]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        32000000,
    priorityGroupsDoneWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        32000000 -
      parsedData[latestIndex - 7]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
        32000000,
  };

  statistics.secondDosesStatistics = {
    total:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"],
    totalDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] -
      parsedData[latestIndex - 1]["cumPeopleVaccinatedSecondDoseByPublishDate"],

    totalDayOnDayPercent:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex - 1][
          "cumPeopleVaccinatedSecondDoseByPublishDate"
        ] -
      1,
    totalWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] -
      parsedData[latestIndex - 7]["cumPeopleVaccinatedSecondDoseByPublishDate"],

    totalWeekOnWeekPercent:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex - 7][
          "cumPeopleVaccinatedSecondDoseByPublishDate"
        ] -
      1,
    new: parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"],
    newDayOnDay:
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] -
      parsedData[latestIndex - 1]["newPeopleVaccinatedSecondDoseByPublishDate"],
    newDayOnDayPercent:
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex - 1][
          "newPeopleVaccinatedSecondDoseByPublishDate"
        ] -
      1,
    newWeekOnWeek:
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] -
      parsedData[latestIndex - 7]["newPeopleVaccinatedSecondDoseByPublishDate"],
    newWeekOnWeekPercent:
      parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"] /
        parsedData[latestIndex - 7][
          "newPeopleVaccinatedSecondDoseByPublishDate"
        ] -
      1,
    sevenDaysRate: parsedData[latestIndex]["sevenDaysRateSecond"],
    sevenDaysRateDayOnDay:
      parsedData[latestIndex]["sevenDaysRateSecond"] -
      parsedData[latestIndex - 1]["sevenDaysRateSecond"],

    sevenDaysRateDayOnDayPercent:
      parsedData[latestIndex]["sevenDaysRateSecond"] /
        parsedData[latestIndex - 1]["sevenDaysRateSecond"] -
      1,
    sevenDaysRateWeekOnWeek:
      parsedData[latestIndex]["sevenDaysRateSecond"] -
      parsedData[latestIndex - 7]["sevenDaysRateSecond"],

    sevenDaysRateWeekOnWeekPercent:
      parsedData[latestIndex]["sevenDaysRateSecond"] /
        parsedData[latestIndex - 7]["sevenDaysRateSecond"] -
      1,
    adultPopulationDone:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
      53000000,
    adultPopulationDoneDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        53000000 -
      parsedData[latestIndex - 1][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        53000000,
    adultPopulationDoneWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        53000000 -
      parsedData[latestIndex - 7][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        53000000,
    priorityGroupsDone:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
      32000000,
    priorityGroupsDoneDayOnDay:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        32000000 -
      parsedData[latestIndex - 1][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        32000000,
    priorityGroupsDoneWeekOnWeek:
      parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"] /
        32000000 -
      parsedData[latestIndex - 7][
        "cumPeopleVaccinatedSecondDoseByPublishDate"
      ] /
        32000000,
  };

  return statistics;
};
