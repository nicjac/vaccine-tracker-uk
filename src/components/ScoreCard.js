import React, { useState, useEffect, Fragment } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import _ from "lodash";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from "recharts";

const ScoreCard = ({
  parsedData,
  targetDate,
  targetIndividuals,
  title,
  description,
}) => {
  const [transformedData, setTransformedData] = useState(null);

  const computeSevenDaysRates = (data) => {
    data.forEach((datum, index) => {
      if (index >= 6) {
        data[index]["sevenDaysRate"] = _.mean(
          data
            .slice(index - 6, index + 1)
            .map((a) => a["newPeopleVaccinatedFirstDoseByPublishDate"])
        );
      } else data[index]["sevenDaysRate"] = null;
    });

    return data;
  };

  const computeDaysToTarget = (data) => {
    data.forEach((datum, index) => {
      data[index]["daysToTarget"] = moment(targetDate)
        .startOf("day")
        .diff(moment(data[index]["date"]).startOf("day"), "days");
    });

    return data;
  };

  const computePredictedDaysToTarget = (data) => {
    data.forEach((datum, index) => {
      data[index]["predictedDaysToTarget"] =
        (targetIndividuals -
          datum["cumPeopleVaccinatedFirstDoseByPublishDate"]) /
        datum["sevenDaysRate"];

      data[index]["deltaTargetVsPredicted"] =
        data[index]["daysToTarget"] - data[index]["predictedDaysToTarget"];
    });

    return data;
  };

  useEffect(() => {
    if (parsedData) {
      let transformedData_ = JSON.parse(JSON.stringify(parsedData));
      console.log(transformedData_);
      transformedData_ = computeSevenDaysRates(transformedData_);
      transformedData_ = computeDaysToTarget(transformedData_);
      transformedData_ = computePredictedDaysToTarget(transformedData_);

      setTransformedData(transformedData_);
    }
  }, [parsedData]);

  if (transformedData) {
    let progressContent;
    const latestIndex = transformedData.length - 1;

    if (transformedData[latestIndex]["deltaTargetVsPredicted"] < 0) {
      progressContent = (
        <Fragment>
          <Icon
            name="warning circle"
            style={{ marginTop: -5, paddingBottom: 40 }}
            size="big"
            color="red"
          />
          <div
            style={{
              fontSize: 12,
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            Predicted to miss target by &nbsp;
            <b>
              {Math.abs(
                Math.round(
                  transformedData[latestIndex]["deltaTargetVsPredicted"]
                )
              )}
              &nbsp; days
            </b>
          </div>
        </Fragment>
      );
    } else if (transformedData[latestIndex]["deltaTargetVsPredicted"] > 0) {
      progressContent = (
        <Fragment>
          <Icon
            name="check circle"
            style={{ marginTop: -5, paddingBottom: 40 }}
            size="big"
            color="green"
          />
          <div
            style={{
              fontSize: 12,
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            Predicted to hit target early by &nbsp;
            <b>
              {Math.round(
                Math.abs(transformedData[latestIndex]["deltaTargetVsPredicted"])
              )}
              &nbsp; days
            </b>
          </div>
        </Fragment>
      );
    } else {
      progressContent = (
        <Fragment>
          <Icon
            name="check circle"
            style={{ marginTop: -5, paddingBottom: 40 }}
            size="big"
            color="green"
          />
          <div
            style={{
              fontSize: 12,
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            Predicted to hit target on the day!
          </div>
        </Fragment>
      );
    }

    return (
      <Grid.Column width={5} textAlign="center">
        <Grid centered>
          <Segment
            basic
            style={{ maxWidth: "200px", marginTop: "10px" }}
            textAlign="center"
          >
            <Header as="h4" textAlign="center">
              <Header.Content>{title}</Header.Content>
              <Header.Subheader>
                {`${targetIndividuals / 1000000}M 1st doses by ${moment(
                  targetDate
                ).format("DD MMM")}`}
              </Header.Subheader>
            </Header>
            <CircularProgressbarWithChildren
              value={
                (transformedData[latestIndex][
                  "cumPeopleVaccinatedFirstDoseByPublishDate"
                ] /
                  targetIndividuals) *
                100
              }
            >
              {progressContent}
            </CircularProgressbarWithChildren>
            <ResponsiveContainer width={"100%"} height={50}>
              <BarChart
                margin={{
                  top: 10,
                  right: 40,
                  left: 40,
                  bottom: 0,
                }}
                data={transformedData.slice(6, transformedData.length)}
              >
                <Bar dataKey="deltaTargetVsPredicted" strokeWidth={2}>
                  {transformedData
                    .slice(6, transformedData.length)
                    .map((entry, index) => {
                      const color =
                        entry.deltaTargetVsPredicted >= 0
                          ? "#b8e6c2"
                          : "#e6a1a1";
                      return <Cell fill={color} />;
                    })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Segment>
        </Grid>
      </Grid.Column>
    );
  } else return null;
};

export default ScoreCard;
