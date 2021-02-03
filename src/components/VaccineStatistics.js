import React, { useState, useEffect } from "react";
import { Statistic, Segment, Grid, Header, Icon } from "semantic-ui-react";
import _ from "lodash";

const VaccineStatistics = ({ parsedData }) => {
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
        new:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] +
          parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"],
        dayOnDay:
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
        weekOnWeek:
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
      });

      setFirstDosesStatistics({
        total:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"],
        new:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"],
        dayOnDay:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] /
            parsedData[latestIndex - 1][
              "newPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          1,
        weekOnWeek:
          parsedData[latestIndex]["newPeopleVaccinatedFirstDoseByPublishDate"] /
            parsedData[latestIndex - 7][
              "newPeopleVaccinatedFirstDoseByPublishDate"
            ] -
          1,
        sevenDaysRate: parsedData[latestIndex]["sevenDaysRate"],
        sevenDaysRateDeltaDay:
          parsedData[latestIndex]["sevenDaysRate"] /
            parsedData[latestIndex - 1]["sevenDaysRate"] -
          1,
        adultPopulationDone:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
          53000000,
        priorityGroupsDone:
          parsedData[latestIndex]["cumPeopleVaccinatedFirstDoseByPublishDate"] /
          32000000,
      });

      setSecondDosesStatistics({
        total:
          parsedData[latestIndex]["cumPeopleVaccinatedSecondDoseByPublishDate"],
        new:
          parsedData[latestIndex]["newPeopleVaccinatedSecondDoseByPublishDate"],
        dayOnDay:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 1][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ] -
          1,
        weekOnWeek:
          parsedData[latestIndex][
            "newPeopleVaccinatedSecondDoseByPublishDate"
          ] /
            parsedData[latestIndex - 7][
              "newPeopleVaccinatedSecondDoseByPublishDate"
            ] -
          1,
        sevenDaysRate: parsedData[latestIndex]["sevenDaysRateSecond"],
        sevenDaysRateDeltaDay:
          parsedData[latestIndex]["sevenDaysRateSecond"] /
            parsedData[latestIndex - 1]["sevenDaysRateSecond"] -
          1,
        adultPopulationDone:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] / 53000000,
        priorityGroupsDone:
          parsedData[latestIndex][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ] / 32000000,
      });
      setLoaded(true);
    }
  }, [parsedData]);

  if (loaded)
    return (
      <Grid>
        <Grid.Row>
          <Segment basic>
            <Header as="h4" dividing textAlign="left">
              <Header.Content>1️⃣ + 2️⃣ All Doses</Header.Content>
            </Header>
            <Statistic.Group size="tiny" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(allDosesStatistics.total)}
                </Statistic.Value>
                <Statistic.Label>Cumulative</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(allDosesStatistics.new)}
                </Statistic.Value>
                <Statistic.Label>Daily Rate</Statistic.Label>
              </Statistic>
              <Statistic
                color={allDosesStatistics.dayOnDay > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {allDosesStatistics.dayOnDay > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(allDosesStatistics.dayOnDay * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Day (Rate)</Statistic.Label>
              </Statistic>
              <Statistic
                color={allDosesStatistics.weekOnWeek > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {allDosesStatistics.weekOnWeek > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(allDosesStatistics.weekOnWeek * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Week (Rate)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(allDosesStatistics.completedCourses * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Completed Courses</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment basic>
            <Header as="h4" dividing dividing textAlign="left">
              <Header.Content>1️⃣ First Doses</Header.Content>
            </Header>
            <Statistic.Group size="tiny" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(firstDosesStatistics.total)}
                </Statistic.Value>
                <Statistic.Label>Cumulative</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(firstDosesStatistics.new)}
                </Statistic.Value>
                <Statistic.Label>Daily Rate</Statistic.Label>
              </Statistic>
              <Statistic
                color={firstDosesStatistics.dayOnDay > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {firstDosesStatistics.dayOnDay > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(firstDosesStatistics.dayOnDay * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Day (Rate)</Statistic.Label>
              </Statistic>
              <Statistic
                color={firstDosesStatistics.weekOnWeek > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {firstDosesStatistics.weekOnWeek > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(firstDosesStatistics.weekOnWeek * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Week (Rate)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(firstDosesStatistics.sevenDaysRate)
                  )}
                </Statistic.Value>
                <Statistic.Label>7-days average</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(firstDosesStatistics.adultPopulationDone * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Adults (53M)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(firstDosesStatistics.adultPopulationDone * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Priority Groups (32M)</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment basic>
            <Header as="h4" dividing dividing textAlign="left">
              <Header.Content>2️⃣ Second Doses</Header.Content>
            </Header>
            <Statistic.Group size="tiny" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(secondDosesStatistics.total)}
                </Statistic.Value>
                <Statistic.Label>Cumulative</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(secondDosesStatistics.new)}
                </Statistic.Value>
                <Statistic.Label>Daily Rate</Statistic.Label>
              </Statistic>
              <Statistic
                color={secondDosesStatistics.dayOnDay > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {secondDosesStatistics.dayOnDay > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(secondDosesStatistics.dayOnDay * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Day (Rate)</Statistic.Label>
              </Statistic>
              <Statistic
                color={secondDosesStatistics.weekOnWeek > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {secondDosesStatistics.weekOnWeek > 0 ? "+" : null}
                  {Intl.NumberFormat("en").format(
                    Math.round(secondDosesStatistics.weekOnWeek * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Δ Week (Rate)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(secondDosesStatistics.sevenDaysRate)
                  )}
                </Statistic.Value>
                <Statistic.Label>7-days average</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(secondDosesStatistics.adultPopulationDone * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Adults (53M)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(
                    Math.round(secondDosesStatistics.adultPopulationDone * 100)
                  )}
                  %
                </Statistic.Value>
                <Statistic.Label>Priority Groups (32M)</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  else return null;
};

export default VaccineStatistics;
