import React, { useState, useEffect } from "react";
import { Statistic, Segment, Grid, Header, Icon } from "semantic-ui-react";
import _ from "lodash";

const VaccineStatistics = ({ parsedData }) => {
  const [loaded, setLoaded] = useState(null);
  const [firstDoseStatistic, setFirstDoseStatistic] = useState(null);
  const [secondDoseStatistic, setSecondDoseStatistic] = useState(null);
  const [allDoseStatistic, setAllDoseStatistic] = useState(null);
  const [sevenDaysRate, setSevenDaysRate] = useState(null);

  useEffect(() => {
    if (parsedData) {
      console.log(parsedData);
      setFirstDoseStatistic(
        parseInt(
          parsedData[parsedData.length - 1][
            "cumPeopleVaccinatedFirstDoseByPublishDate"
          ]
        )
      );

      setSecondDoseStatistic(
        parseInt(
          parsedData[parsedData.length - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ]
        )
      );

      setAllDoseStatistic(
        parseInt(
          parsedData[parsedData.length - 1][
            "cumPeopleVaccinatedSecondDoseByPublishDate"
          ]
        ) +
          parseInt(
            parsedData[parsedData.length - 1][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ]
          )
      );

      let sevenDaysRates = parsedData
        .slice(parsedData.length - 7, parsedData.length)
        .map((a) => a["newPeopleVaccinatedFirstDoseByPublishDate"]);
      const sevenDaysRate_ = _.mean(sevenDaysRates);
      setSevenDaysRate(sevenDaysRate_);

      setLoaded(true);
    }
  }, [parsedData]);

  if (loaded)
    return (
      <Grid centered>
        <Grid.Row>
          <Segment basic>
            <Header as="h4" dividing>
              <Icon name="numbered list" />
              <Header.Content>Number of doses</Header.Content>
            </Header>
            <Statistic.Group size="small" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(allDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>💉 All Doses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(firstDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>1️⃣ First Doses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(secondDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>2️⃣ Second Doses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(Math.round(sevenDaysRate))}
                </Statistic.Value>
                <Statistic.Label>📈 7-day 1st doses rate</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment basic>
            <Header as="h4" dividing>
              <Icon name="chart bar" />
              <Header.Content>Distribution</Header.Content>
            </Header>
            <Statistic.Group size="small" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {((firstDoseStatistic / 53000000) * 100).toFixed(2)}%
                </Statistic.Value>
                <Statistic.Label>Adult Population</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {((firstDoseStatistic / 32000000) * 100).toFixed(2)}%
                </Statistic.Value>
                <Statistic.Label>All Priority Groups</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  else return null;
};

export default VaccineStatistics;
