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

const VaccineStatisticsCompact = ({
  parsedData,
  showTweets,
  dateUpdated,
  statistics,
}) => {
  if (statistics)
    return (
      <Grid>
        <Grid.Row>
          {showTweets && (
            <Fragment>
              <Segment textAlign="left">
                📈{moment(dateUpdated).format("DD MMMM")} Progress Tracker📈
                <br />
                <br />
                1️⃣ 1st Dose
                <br />
                Adults{" "}
                {"▓".repeat(
                  Math.ceil(
                    statistics.firstDosesStatistics.adultPopulationDone * 20
                  )
                )}
                {"░".repeat(
                  20 -
                    Math.ceil(
                      statistics.firstDosesStatistics.adultPopulationDone * 20
                    )
                )}{" "}
                {(
                  statistics.firstDosesStatistics.adultPopulationDone * 100
                ).toFixed(0)}
                %
                <br />
                Priority{" "}
                {"▓".repeat(
                  Math.ceil(
                    statistics.firstDosesStatistics.priorityGroupsDone * 20
                  )
                )}
                {20 -
                  Math.ceil(
                    statistics.firstDosesStatistics.priorityGroupsDone * 20
                  ) >
                0
                  ? "░".repeat(
                      20 -
                        Math.ceil(
                          statistics.firstDosesStatistics.priorityGroupsDone *
                            20
                        )
                    )
                  : null}{" "}
                {(
                  statistics.firstDosesStatistics.priorityGroupsDone * 100
                ).toFixed(0)}
                %
                <br />
                <br />
                2️⃣ 2nd Dose <br />
                Adults{" "}
                {"▓".repeat(
                  Math.ceil(
                    statistics.secondDosesStatistics.adultPopulationDone * 20
                  )
                )}
                {"░".repeat(
                  20 -
                    Math.ceil(
                      statistics.secondDosesStatistics.adultPopulationDone * 20
                    )
                )}{" "}
                {(
                  statistics.secondDosesStatistics.adultPopulationDone * 100
                ).toFixed(0)}
                %
                <br />
                Priority{" "}
                {"▓".repeat(
                  Math.ceil(
                    statistics.secondDosesStatistics.priorityGroupsDone * 20
                  )
                )}
                {"░".repeat(
                  20 -
                    Math.ceil(
                      statistics.secondDosesStatistics.priorityGroupsDone * 20
                    )
                )}{" "}
                {(
                  statistics.secondDosesStatistics.priorityGroupsDone * 100
                ).toFixed(0)}
                %
                <br />
                <br />
                #vaccine
              </Segment>
              <Segment textAlign="left">
                1️⃣ First Doses Update on {moment(dateUpdated).format("DD MMMM")}{" "}
                📢
                <br />
                <br />
                {Intl.NumberFormat("en").format(
                  statistics.firstDosesStatistics.new
                )}{" "}
                new doses administered yesterday (
                {moment(dateUpdated).subtract(1, "days").format("DD MMMM")})
                across the UK🇬🇧
                <br />
                <br />
                Total 1st Doses:{" "}
                {Intl.NumberFormat("en").format(
                  statistics.firstDosesStatistics.total
                )}
                <br />
                <br />
                {statistics.firstDosesStatistics.newDayOnDayPercent > 0
                  ? "📈+"
                  : "📉-"}
                {Math.abs(
                  Math.round(
                    statistics.firstDosesStatistics.newDayOnDayPercent * 100
                  )
                )}
                % day on day rate <br />
                {statistics.firstDosesStatistics.newWeekOnWeekPercent > 0
                  ? "📈+"
                  : "📉-"}
                {Math.abs(
                  Math.round(
                    statistics.firstDosesStatistics.newWeekOnWeekPercent * 100
                  )
                )}
                % week on week rate <br />
                {statistics.firstDosesStatistics
                  .sevenDaysRateWeekOnWeekPercent > 0
                  ? "📈"
                  : "📉"}
                7-day average of{" "}
                {Intl.NumberFormat("en").format(
                  Math.round(statistics.firstDosesStatistics.sevenDaysRate)
                )}{" "}
                (
                {statistics.firstDosesStatistics
                  .sevenDaysRateWeekOnWeekPercent > 0
                  ? "+"
                  : "-"}
                {Math.abs(
                  Math.round(
                    statistics.firstDosesStatistics
                      .sevenDaysRateWeekOnWeekPercent * 100
                  )
                )}
                % week on week)
                <br />
                <br />
                #vaccine #COVID19
              </Segment>
              <Segment textAlign="left">
                2️⃣ Second Doses Update on{" "}
                {moment(dateUpdated).format("DD MMMM")} 📢
                <br />
                <br />
                {Intl.NumberFormat("en").format(
                  statistics.secondDosesStatistics.new
                )}{" "}
                new doses administered yesterday (
                {moment(dateUpdated).subtract(1, "days").format("DD MMMM")})
                across the UK🇬🇧
                <br />
                <br />
                Total 2nd Doses:{" "}
                {Intl.NumberFormat("en").format(
                  statistics.secondDosesStatistics.total
                )}
                <br />
                <br />
                {statistics.secondDosesStatistics.newDayOnDayPercent > 0
                  ? "📈+"
                  : "📉-"}
                {Math.abs(
                  Math.round(
                    statistics.secondDosesStatistics.newDayOnDayPercent * 100
                  )
                )}
                % day on day rate <br />
                {statistics.secondDosesStatistics.newWeekOnWeekPercent > 0
                  ? "📈+"
                  : "📉-"}
                {Math.abs(
                  Math.round(
                    statistics.secondDosesStatistics.newWeekOnWeekPercent * 100
                  )
                )}
                % week on week rate <br />
                {statistics.secondDosesStatistics
                  .sevenDaysRateWeekOnWeekPercent > 0
                  ? "📈"
                  : "📉"}
                7-day average of{" "}
                {Intl.NumberFormat("en").format(
                  Math.round(statistics.secondDosesStatistics.sevenDaysRate)
                )}{" "}
                (
                {statistics.secondDosesStatistics
                  .sevenDaysRateWeekOnWeekPercent > 0
                  ? "+"
                  : "-"}
                {Math.abs(
                  Math.round(
                    statistics.secondDosesStatistics
                      .sevenDaysRateWeekOnWeekPercent * 100
                  )
                )}
                % week on week)
                <br />
                <br />
                #vaccine #COVID19
              </Segment>
            </Fragment>
          )}
          <Segment basic textAlign="left">
            <Header as="h3" dividing textAlign="left">
              <Header.Content>💉 Overall Progress</Header.Content>
            </Header>
            <Card.Group>
              <Card textAlign="left" compact>
                <Card.Content>
                  <Card.Header>Adult Population</Card.Header>
                  <Card.Meta>53M individuals</Card.Meta>

                  <Card.Description>
                    <Header as="h5" style={{ marginBottom: "2px" }}>
                      First Doses
                    </Header>
                    <Progress
                      percent={(
                        statistics.firstDosesStatistics.adultPopulationDone *
                        100
                      ).toFixed(0)}
                      progress
                      color="blue"
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        statistics.firstDosesStatistics
                          .adultPopulationDoneDayOnDay * 100
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
                        statistics.secondDosesStatistics.adultPopulationDone *
                        100
                      ).toFixed(0)}
                      progress
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        statistics.secondDosesStatistics
                          .adultPopulationDoneDayOnDay * 100
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
                        statistics.firstDosesStatistics
                          .priorityGroupsDoneDayOnDay * 100
                      ).toFixed(1)}
                    </b>
                    % &nbsp;
                    <Icon color="green" name="arrow up" />Δ Week: &nbsp;
                    <b>
                      {(
                        statistics.firstDosesStatistics
                          .priorityGroupsDoneWeekOnWeek * 100
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
                        statistics.secondDosesStatistics.priorityGroupsDone *
                        100
                      ).toFixed(0)}
                      progress
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        statistics.secondDosesStatistics
                          .priorityGroupsDoneDayOnDay * 100
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
                  (
                    statistics.allDosesStatistics.completedCourses * 100
                  ).toFixed(1) + "%"
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
          </Segment>
          <Segment basic textAlign="left">
            <Header as="h3" dividing textAlign="left">
              <Header.Content>1️⃣ + 2️⃣ All Doses</Header.Content>
            </Header>
            <Card.Group>
              <VaccineStatisticsCompactCard
                title="Cumulative"
                description="Inoculations so far"
                mainFigure={Intl.NumberFormat("en").format(
                  statistics.allDosesStatistics.total
                )}
                dayOnDay={statistics.allDosesStatistics.totalDayOnDay}
                dayOnDayPercent={
                  statistics.allDosesStatistics.totalDayOnDayPercent
                }
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
                dayOnDayPercent={
                  statistics.allDosesStatistics.newDayOnDayPercent
                }
                weekOnWeek={statistics.allDosesStatistics.newWeekOnWeek}
                weekOnWeekPercent={
                  statistics.allDosesStatistics.newWeekOnWeekPercent
                }
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
                weekOnWeek={
                  statistics.allDosesStatistics.sevenDaysRateWeekOnWeek
                }
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
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment basic textAlign="left">
            <Header as="h3" dividing textAlign="left">
              <Header.Content>1️⃣ First Doses</Header.Content>
            </Header>
            <Card.Group>
              <VaccineStatisticsCompactCard
                title="Cumulative"
                description="1st Doses so far"
                mainFigure={Intl.NumberFormat("en").format(
                  statistics.firstDosesStatistics.total
                )}
                dayOnDay={statistics.firstDosesStatistics.totalDayOnDay}
                dayOnDayPercent={
                  statistics.firstDosesStatistics.totalDayOnDayPercent
                }
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
                dayOnDayPercent={
                  statistics.firstDosesStatistics.newDayOnDayPercent
                }
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
                weekOnWeek={
                  statistics.firstDosesStatistics.sevenDaysRateWeekOnWeek
                }
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
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment basic textAlign="left">
            <Header as="h3" dividing textAlign="left">
              <Header.Content>2️⃣ Second Doses</Header.Content>
            </Header>
            <Card.Group>
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
                dayOnDayPercent={
                  statistics.secondDosesStatistics.newDayOnDayPercent
                }
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
                dayOnDay={
                  statistics.secondDosesStatistics.sevenDaysRateDayOnDay
                }
                dayOnDayPercent={
                  statistics.secondDosesStatistics.sevenDaysRateDayOnDayPercent
                }
                weekOnWeek={
                  statistics.secondDosesStatistics.sevenDaysRateWeekOnWeek
                }
                weekOnWeekPercent={
                  statistics.secondDosesStatistics
                    .sevenDaysRateWeekOnWeekPercent
                }
                dataToPlot={parsedData.map((item) => {
                  return {
                    data: item["sevenDaysRateSecond"],
                    date: item["date"],
                  };
                })}
              />
            </Card.Group>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  else return null;
};

export default VaccineStatisticsCompact;
