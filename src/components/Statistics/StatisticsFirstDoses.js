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

const StatisticsFirstDoses = ({
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
          description="1st Doses so far"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.firstDosesStatistics.total
          )}
          dayOnDay={statistics.firstDosesStatistics.totalDayOnDay}
          dayOnDayPercent={statistics.firstDosesStatistics.totalDayOnDayPercent}
          weekOnWeek={statistics.firstDosesStatistics.totalWeekOnWeek}
          weekOnWeekPercent={
            statistics.firstDosesStatistics.totalWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["cumPeopleVaccinatedFirstDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="Daily Rate"
          description="New 1st Doses"
          mainFigure={Intl.NumberFormat("en").format(
            statistics.firstDosesStatistics.new
          )}
          dayOnDay={statistics.firstDosesStatistics.newDayOnDay}
          dayOnDayPercent={statistics.firstDosesStatistics.newDayOnDayPercent}
          weekOnWeek={statistics.firstDosesStatistics.newWeekOnWeek}
          weekOnWeekPercent={
            statistics.firstDosesStatistics.newWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["newPeopleVaccinatedFirstDoseByPublishDate"],
              date: item["date"],
            };
          })}
        />
        <VaccineStatisticsCompactCard
          title="7-Day Average"
          description="7-Day Average for 1st Doses"
          mainFigure={Intl.NumberFormat("en").format(
            Math.round(statistics.firstDosesStatistics.sevenDaysRate)
          )}
          dayOnDay={statistics.firstDosesStatistics.sevenDaysRateDayOnDay}
          dayOnDayPercent={
            statistics.firstDosesStatistics.sevenDaysRateDayOnDayPercent
          }
          weekOnWeek={statistics.firstDosesStatistics.sevenDaysRateWeekOnWeek}
          weekOnWeekPercent={
            statistics.firstDosesStatistics.sevenDaysRateWeekOnWeekPercent
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data: item["sevenDaysRate"],
              date: item["date"],
            };
          })}
        />
      </Card.Group>
    );
  else return null;
};

export default StatisticsFirstDoses;
