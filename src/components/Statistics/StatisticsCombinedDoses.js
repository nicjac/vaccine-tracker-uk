import React, { useState, useEffect, Fragment } from "react";
import {
  Statistic,
  Segment,
  Grid,
  Header,
  Icon,
  Progress,
  Card,
} from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";

import VaccineStatisticsCompactCard from "./VaccineStatisticsCompactCard";

const StatisticsCombinedDoses = ({
  parsedData,
  showTweets,
  dateUpdated,
  statistics,
}) => {
  if (statistics)
    return (
      <Card.Group centered textAlign="left">
        <VaccineStatisticsCompactCard
          title="Cumulative"
          description="Inoculations so far"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.allDosesStatistics.total
          )}
          dayOnDay={statistics.allDosesStatistics.totalDayOnDay}
          dayOnDayPercent={statistics.allDosesStatistics.totalDayOnDayPercent}
          weekOnWeek={statistics.allDosesStatistics.totalWeekOnWeek}
          weekOnWeekPercent={
            statistics.allDosesStatistics.totalWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data:
                item["cumPeopleVaccinatedFirstDoseByPublishDate"] +
                item["cumPeopleVaccinatedSecondDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="Daily Rate"
          description="Number of new inoculations"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.allDosesStatistics.new
          )}
          dayOnDay={statistics.allDosesStatistics.newDayOnDay}
          dayOnDayPercent={statistics.allDosesStatistics.newDayOnDayPercent}
          weekOnWeek={statistics.allDosesStatistics.newWeekOnWeek}
          weekOnWeekPercent={statistics.allDosesStatistics.newWeekOnWeekPercent}
          dataToPlot={parsedData.map((item) => {
            return {
              data:
                item["newPeopleVaccinatedFirstDoseByPublishDate"] +
                item["newPeopleVaccinatedSecondDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="7-Day Average"
          description="7-Day Average for inoculations"
          mainFigure={Intl.NumberFormat("en").format(
            Math.round(statistics.allDosesStatistics.sevenDaysRate)
          )}
          dayOnDay={statistics.allDosesStatistics.sevenDaysRateDayOnDay}
          dayOnDayPercent={
            statistics.allDosesStatistics.sevenDaysRateDayOnDayPercent
          }
          weekOnWeek={statistics.allDosesStatistics.sevenDaysRateWeekOnWeek}
          weekOnWeekPercent={
            statistics.allDosesStatistics.sevenDaysRateWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["sevenDaysRate"] + item["sevenDaysRateSecond"],
              date: item["date"],
            };
          })}
        />
      </Card.Group>
    );
  else return null;
};

export default StatisticsCombinedDoses;
