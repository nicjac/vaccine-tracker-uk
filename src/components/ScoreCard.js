import React, { useState, useEffect, Fragment } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

const ScoreCard = ({ parsedData, targetDate, targetIndividuals, title }) => {
  const [transformedData, setTransformedData] = useState(null);

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

      console.log(data[index]["deltaTargetVsPredicted"]);
      data[index]["predictedDate"] = moment(targetDate)
        .add(-1 * data[index]["deltaTargetVsPredicted"], "days")
        .format("DD MMMM YYYY");
    });

    return data;
  };

  useEffect(() => {
    if (parsedData) {
      let transformedData_ = JSON.parse(JSON.stringify(parsedData));
      transformedData_ = computeDaysToTarget(transformedData_);
      transformedData_ = computePredictedDaysToTarget(transformedData_);

      setTransformedData(transformedData_);
    }
  }, [parsedData]);

  if (transformedData) {
    let progressContent;
    const latestIndex = transformedData.length - 1;

    const delta = Math.round(
      transformedData[latestIndex]["deltaTargetVsPredicted"]
    );

    if (delta < 0) {
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
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            <b>
              {Math.abs(delta)}
              &nbsp; {Math.abs(delta) === 1 ? "day" : "days"} late
            </b>
            <p>({transformedData[latestIndex]["predictedDate"]})</p>
          </div>
        </Fragment>
      );
    } else if (delta > 0) {
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
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            <b>
              {Math.round(Math.abs(delta))}
              &nbsp; {Math.abs(delta) === 1 ? "day" : "days"} early
            </b>
            <p>({transformedData[latestIndex]["predictedDate"]})</p>
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
