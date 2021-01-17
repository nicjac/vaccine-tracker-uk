import React, { useState, useEffect } from "react";
import { Statistic, Segment, Grid } from "semantic-ui-react";

const VaccineStatistics = ({ parsedData }) => {
  const [loaded, setLoaded] = useState(null);
  const [firstDoseStatistic, setFirstDoseStatistic] = useState(null);
  const [secondDoseStatistic, setSecondDoseStatistic] = useState(null);
  const [allDoseStatistic, setAllDoseStatistic] = useState(null);

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

      setLoaded(true);
    }
  }, [parsedData]);

  if (loaded)
    return (
      <Grid centered>
        <Grid.Column textAlign="center">
          <Segment textAlign="center">
            <Statistic.Group size="small" style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(allDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>Total Doses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(firstDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>First Doses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {Intl.NumberFormat("en").format(secondDoseStatistic)}
                </Statistic.Value>
                <Statistic.Label>Second Doses</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  else return null;
};

export default VaccineStatistics;
