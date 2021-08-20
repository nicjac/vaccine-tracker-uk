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

const StatisticsOverall = ({
  parsedData,
  showTweets,
  dateUpdated,
  statistics,
}) => {
  if (statistics)
    return (
      <Card.Group centered textAlign="left">
        <Card textAlign="left" compact>
          <Card.Content>
            <Card.Header>16+ Population</Card.Header>
            <Card.Meta>54.4M individuals</Card.Meta>

            <Card.Description>
              <Header as="h5" style={{ marginBottom: "2px" }}>
                First Doses
              </Header>
              <Progress
                percent={(
                  statistics.firstDosesStatistics.adultPopulationDone * 100
                ).toFixed(0)}
                progress
                color="blue"
                size="small"
                style={{ marginBottom: "5px", marginTop: "3px" }}
              />
              <Icon color="green" name="arrow up" />Δ Day: &nbsp;
              <b>
                {(
                  statistics.firstDosesStatistics.adultPopulationDoneDayOnDay *
                  100
                ).toFixed(1)}
              </b>
              % &nbsp;
              <Icon color="green" name="arrow up" />Δ Week: &nbsp;
              <b>
                {(
                  statistics.firstDosesStatistics
                    .adultPopulationDoneWeekOnWeek * 100
                ).toFixed(1)}
              </b>
              %
            </Card.Description>
            <Card.Description style={{ marginTop: "5px" }}>
              <Header as="h5" style={{ marginBottom: "2px" }}>
                Second Doses
              </Header>
              <Progress
                color="green"
                percent={(
                  statistics.secondDosesStatistics.adultPopulationDone * 100
                ).toFixed(0)}
                progress
                size="small"
                style={{ marginBottom: "5px", marginTop: "3px" }}
              />
              <Icon color="green" name="arrow up" />Δ Day: &nbsp;
              <b>
                {(
                  statistics.secondDosesStatistics.adultPopulationDoneDayOnDay *
                  100
                ).toFixed(1)}
              </b>
              % &nbsp;
              <Icon color="green" name="arrow up" />Δ Week: &nbsp;
              <b>
                {(
                  statistics.secondDosesStatistics
                    .adultPopulationDoneWeekOnWeek * 100
                ).toFixed(1)}
              </b>
              %
            </Card.Description>
          </Card.Content>
        </Card>
        <Card textAlign="left" compact>
          <Card.Content>
            <Card.Header>Priority Groups</Card.Header>
            <Card.Meta>32M individuals</Card.Meta>

            <Card.Description>
              <Header as="h5" style={{ marginBottom: "2px" }}>
                First Doses
              </Header>
              <Progress
                percent={(
                  statistics.firstDosesStatistics.priorityGroupsDone * 100
                ).toFixed(0)}
                progress
                size="small"
                color="blue"
                style={{ marginBottom: "5px", marginTop: "3px" }}
              />
              <Icon color="green" name="arrow up" />Δ Day: &nbsp;
              <b>
                {(
                  statistics.firstDosesStatistics.priorityGroupsDoneDayOnDay *
                  100
                ).toFixed(1)}
              </b>
              % &nbsp;
              <Icon color="green" name="arrow up" />Δ Week: &nbsp;
              <b>
                {(
                  statistics.firstDosesStatistics.priorityGroupsDoneWeekOnWeek *
                  100
                ).toFixed(1)}
              </b>
              %
            </Card.Description>
            <Card.Description style={{ marginTop: "5px" }}>
              <Header as="h5" style={{ marginBottom: "2px" }}>
                Second Doses
              </Header>
              <Progress
                color="green"
                percent={(
                  statistics.secondDosesStatistics.priorityGroupsDone * 100
                ).toFixed(0)}
                progress
                size="small"
                style={{ marginBottom: "5px", marginTop: "3px" }}
              />
              <Icon color="green" name="arrow up" />Δ Day: &nbsp;
              <b>
                {(
                  statistics.secondDosesStatistics.priorityGroupsDoneDayOnDay *
                  100
                ).toFixed(1)}
              </b>
              % &nbsp;
              <Icon color="green" name="arrow up" />Δ Week: &nbsp;
              <b>
                {(
                  statistics.secondDosesStatistics
                    .priorityGroupsDoneWeekOnWeek * 100
                ).toFixed(1)}
              </b>
              %
            </Card.Description>
          </Card.Content>
        </Card>
        <VaccineStatisticsCompactCard
          title="Completed Courses"
          description="Fraction of completed courses"
          mainFigure={
            (statistics.allDosesStatistics.completedCourses * 100).toFixed(1) +
            "%"
          }
          dayOnDay={
            statistics.allDosesStatistics.completedCoursesDayOnDay * 100
          }
          weekOnWeek={
            statistics.allDosesStatistics.completedCoursesWeekOnWeek * 100
          }
          dataToPlot={parsedData.map((item) => {
            return {
              data:
                item["cumPeopleVaccinatedSecondDoseByPublishDate"] /
                item["cumPeopleVaccinatedFirstDoseByPublishDate"],
            };
          })}
          disableDeltaRounding={true}
        />
      </Card.Group>
    );
  else return null;
};

export default StatisticsOverall;
