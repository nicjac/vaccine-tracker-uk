import React, { useState, useEffect } from "react";
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
import VaccineStatisticsCompactCard from "./VaccineStatisticsCompactCard";

const VaccineStatisticsCompact = ({ parsedData }) => {
  const [loaded, setLoaded] = useState(null);

  const [allDosesStatistics, setAllDosesStatistics] = useState(null);
  const [firstDosesStatistics, setFirstDosesStatistics] = useState(null);
  const [secondDosesStatistics, setSecondDosesStatistics] = useState(null);

  useEffect(() => {
    if (parsedData) {
      const latestIndex = parsedData.length - 1;

      setAllDosesStatistics({
        total:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"],
        totalDayOnDay:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          (parsedData[latestIndex - 1][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex - 1][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ]),
        totalDayOnDayPercent:
          (parsedData[latestIndex][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ]) /
            (parsedData[latestIndex - 1][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ] +
              parsedData[latestIndex - 1][
                "cumPeopleVaccinatedSecondDoseByPublishDate"
              ]) -
          1,
        totalWeekOnWeek:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          (parsedData[latestIndex - 7][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex - 7][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ]),
        totalWeekOnWeekPercent:
          (parsedData[latestIndex][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ]) /
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
          (parsedData[latestIndex][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ]) /
            (parsedData[latestIndex - 1][
              "newPeopleVaccinatedFirstDoseByPublishDate"
            ] +
              parsedData[latestIndex - 1][
                "newPeopleVaccinatedSecondDoseByPublishDate"
              ]) -
          1,
        newDayOnDay:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          (parsedData[latestIndex - 1][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex - 1][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ]),
        newWeekOnWeek:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          (parsedData[latestIndex - 7][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex - 7][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ]),
        newWeekOnWeekPercent:
          (parsedData[latestIndex][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ] +
            parsedData[latestIndex][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ]) /
            (parsedData[latestIndex - 7][
              "newPeopleVaccinatedFirstDoseByPublishDate"
            ] +
              parsedData[latestIndex - 7][
                "newPeopleVaccinatedSecondDoseByPublishDate"
              ]) -
          1,
        completedCourses:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"],
        completedCoursesWeekOnWeek:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 7][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ],
        completedCoursesDayOnDay:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ] -
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
      });

      setFirstDosesStatistics({
        total:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"],
        totalDayOnDay:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ],

        totalDayOnDayPercent:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
            parsedData[latestIndex - 1][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          1,
        totalWeekOnWeek:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ],

        totalWeekOnWeekPercent:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
            parsedData[latestIndex - 7][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          1,
        new:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"],
        newDayOnDay:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] -
          parsedData[latestIndex - 1][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ],
        newDayOnDayPercent:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] /
            parsedData[latestIndex - 1][
              "newPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          1,
        newWeekOnWeek:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] -
          parsedData[latestIndex - 7][
            "newPeopleVaccinatedFirstDoseByPublishDate"
          ],
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
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] /
            53000000,
        adultPopulationDoneWeekOnWeek:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
            53000000 -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] /
            53000000,
        priorityGroupsDone:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
          32000000,
        priorityGroupsDoneDayOnDay:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
            32000000 -
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] /
            32000000,
        priorityGroupsDoneWeekOnWeek:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
            32000000 -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ] /
            32000000,
      });

      setSecondDosesStatistics({
        total:
          parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"],
        totalDayOnDay:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ],

        totalDayOnDayPercent:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 1][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ] -
          1,
        totalWeekOnWeek:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ],

        totalWeekOnWeekPercent:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 7][
              "cumPeopleVaccinatedSecondDoseByPublishDate"
            ] -
          1,
        new:
          parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"],
        newDayOnDay:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          parsedData[latestIndex - 1][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ],
        newDayOnDayPercent:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 1][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ] -
          1,
        newWeekOnWeek:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] -
          parsedData[latestIndex - 7][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ],
        newWeekOnWeekPercent:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] /
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
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] / 53000000,
        adultPopulationDoneDayOnDay:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            53000000 -
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            53000000,
        adultPopulationDoneWeekOnWeek:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            53000000 -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            53000000,
        priorityGroupsDone:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] / 32000000,
        priorityGroupsDoneDayOnDay:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            32000000 -
          parsedData[latestIndex - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            32000000,
        priorityGroupsDoneWeekOnWeek:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            32000000 -
          parsedData[latestIndex - 7][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            32000000,
      });
      setLoaded(true);
    }
  }, [parsedData]);

  if (loaded)
    return (
      <Grid>
        <Grid.Row>
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
                        firstDosesStatistics.adultPopulationDone * 100
                      ).toFixed(0)}
                      progress
                      color="blue"
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        firstDosesStatistics.adultPopulationDoneDayOnDay * 100
                      ).toFixed(1)}
                    </b>
                    % &nbsp;
                    <Icon color="green" name="arrow up" />Δ Week: &nbsp;
                    <b>
                      {(
                        firstDosesStatistics.adultPopulationDoneWeekOnWeek * 100
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
                        secondDosesStatistics.adultPopulationDone * 100
                      ).toFixed(0)}
                      progress
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        secondDosesStatistics.adultPopulationDoneDayOnDay * 100
                      ).toFixed(1)}
                    </b>
                    % &nbsp;
                    <Icon color="green" name="arrow up" />Δ Week: &nbsp;
                    <b>
                      {(
                        secondDosesStatistics.adultPopulationDoneWeekOnWeek *
                        100
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
                        firstDosesStatistics.priorityGroupsDone * 100
                      ).toFixed(0)}
                      progress
                      size="small"
                      color="blue"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        firstDosesStatistics.priorityGroupsDoneDayOnDay * 100
                      ).toFixed(1)}
                    </b>
                    % &nbsp;
                    <Icon color="green" name="arrow up" />Δ Week: &nbsp;
                    <b>
                      {(
                        firstDosesStatistics.priorityGroupsDoneWeekOnWeek * 100
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
                        secondDosesStatistics.priorityGroupsDone * 100
                      ).toFixed(0)}
                      progress
                      size="small"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    />
                    <Icon color="green" name="arrow up" />Δ Day: &nbsp;
                    <b>
                      {(
                        secondDosesStatistics.priorityGroupsDoneDayOnDay * 100
                      ).toFixed(1)}
                    </b>
                    % &nbsp;
                    <Icon color="green" name="arrow up" />Δ Week: &nbsp;
                    <b>
                      {(
                        secondDosesStatistics.priorityGroupsDoneWeekOnWeek * 100
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
                  (allDosesStatistics.completedCourses * 100).toFixed(1) + "%"
                }
                dayOnDay={allDosesStatistics.completedCoursesDayOnDay * 100}
                weekOnWeek={allDosesStatistics.completedCoursesWeekOnWeek * 100}
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
                title="Cummulative"
                description="Inoculations so far"
                mainFigure={Intl.NumberFormat("en").format(
                  allDosesStatistics.total
                )}
                dayOnDay={allDosesStatistics.totalDayOnDay}
                dayOnDayPercent={allDosesStatistics.totalDayOnDayPercent}
                weekOnWeek={allDosesStatistics.totalWeekOnWeek}
                weekOnWeekPercent={allDosesStatistics.totalWeekOnWeekPercent}
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
                  allDosesStatistics.new
                )}
                dayOnDay={allDosesStatistics.newDayOnDay}
                dayOnDayPercent={allDosesStatistics.newDayOnDayPercent}
                weekOnWeek={allDosesStatistics.newWeekOnWeek}
                weekOnWeekPercent={allDosesStatistics.newWeekOnWeekPercent}
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
                  Math.round(allDosesStatistics.sevenDaysRate)
                )}
                dayOnDay={allDosesStatistics.sevenDaysRateDayOnDay}
                dayOnDayPercent={
                  allDosesStatistics.sevenDaysRateDayOnDayPercent
                }
                weekOnWeek={allDosesStatistics.sevenDaysRateWeekOnWeek}
                weekOnWeekPercent={
                  allDosesStatistics.sevenDaysRateWeekOnWeekPercent
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
                title="Cummulative"
                description="1st Doses so far"
                mainFigure={Intl.NumberFormat("en").format(
                  firstDosesStatistics.total
                )}
                dayOnDay={firstDosesStatistics.totalDayOnDay}
                dayOnDayPercent={firstDosesStatistics.totalDayOnDayPercent}
                weekOnWeek={firstDosesStatistics.totalWeekOnWeek}
                weekOnWeekPercent={firstDosesStatistics.totalWeekOnWeekPercent}
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
                  firstDosesStatistics.new
                )}
                dayOnDay={firstDosesStatistics.newDayOnDay}
                dayOnDayPercent={firstDosesStatistics.newDayOnDayPercent}
                weekOnWeek={firstDosesStatistics.newWeekOnWeek}
                weekOnWeekPercent={firstDosesStatistics.newWeekOnWeekPercent}
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
                  Math.round(firstDosesStatistics.sevenDaysRate)
                )}
                dayOnDay={firstDosesStatistics.sevenDaysRateDayOnDay}
                dayOnDayPercent={
                  firstDosesStatistics.sevenDaysRateDayOnDayPercent
                }
                weekOnWeek={firstDosesStatistics.sevenDaysRateWeekOnWeek}
                weekOnWeekPercent={
                  firstDosesStatistics.sevenDaysRateWeekOnWeekPercent
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
                title="Cummulative"
                description="2nd Doses so far"
                mainFigure={Intl.NumberFormat("en").format(
                  secondDosesStatistics.total
                )}
                dayOnDay={secondDosesStatistics.totalDayOnDay}
                dayOnDayPercent={secondDosesStatistics.totalDayOnDayPercent}
                weekOnWeek={secondDosesStatistics.totalWeekOnWeek}
                weekOnWeekPercent={secondDosesStatistics.totalWeekOnWeekPercent}
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
                  secondDosesStatistics.new
                )}
                dayOnDay={secondDosesStatistics.newDayOnDay}
                dayOnDayPercent={secondDosesStatistics.newDayOnDayPercent}
                weekOnWeek={secondDosesStatistics.newWeekOnWeek}
                weekOnWeekPercent={secondDosesStatistics.newWeekOnWeekPercent}
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
                  Math.round(secondDosesStatistics.sevenDaysRate)
                )}
                dayOnDay={secondDosesStatistics.sevenDaysRateDayOnDay}
                dayOnDayPercent={
                  secondDosesStatistics.sevenDaysRateDayOnDayPercent
                }
                weekOnWeek={secondDosesStatistics.sevenDaysRateWeekOnWeek}
                weekOnWeekPercent={
                  secondDosesStatistics.sevenDaysRateWeekOnWeekPercent
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
