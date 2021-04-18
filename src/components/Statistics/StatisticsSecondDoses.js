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

const StatisticsSecondDoses = ({
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
          description="2nd Doses so far"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.secondDosesStatistics.total
          )}
          dayOnDay={statistics.secondDosesStatistics.totalDayOnDay}
          dayOnDayPercent={
            statistics.secondDosesStatistics.totalDayOnDayPercent
          }
          weekOnWeek={statistics.secondDosesStatistics.totalWeekOnWeek}
          weekOnWeekPercent={
            statistics.secondDosesStatistics.totalWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["cumPeopleVaccinatedSecondDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="Daily Rate"
          description="New 2nd Doses"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.secondDosesStatistics.new
          )}
          dayOnDay={statistics.secondDosesStatistics.newDayOnDay}
          dayOnDayPercent={statistics.secondDosesStatistics.newDayOnDayPercent}
          weekOnWeek={statistics.secondDosesStatistics.newWeekOnWeek}
          weekOnWeekPercent={
            statistics.secondDosesStatistics.newWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["newPeopleVaccinatedSecondDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="7-Day Average"
          description="7-Day Average for 2nd Doses"
          mainFigure={Intl.NumberFormat("en").format(
            Math.round(statistics.secondDosesStatistics.sevenDaysRate)
          )}
          dayOnDay={statistics.secondDosesStatistics.sevenDaysRateDayOnDay}
          dayOnDayPercent={
            statistics.secondDosesStatistics.sevenDaysRateDayOnDayPercent
          }
          weekOnWeek={statistics.secondDosesStatistics.sevenDaysRateWeekOnWeek}
          weekOnWeekPercent={
            statistics.secondDosesStatistics.sevenDaysRateWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["sevenDaysRateSecond"],
              date: item["date"],
            };
          })}
        />
      </Card.Group>
    );
  else return null;
};

export default StatisticsSecondDoses;
