import React, { useState, useEffect, Fragment } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import _ from "lodash";

const ScoreCard = ({
  parsedData,
  targetDate,
  targetIndividuals,
  title,
  description,
}) => {
  const [sevenDaysRate, setSevenDaysRate] = useState(null);
  const [predictedDaysToTarget, setPredictedDaysToTarget] = useState(null);
  const [daysToTarget, setDaysToTarget] = useState(null);
  const [percentCompletion, setPercentCompletion] = useState(null);

  useEffect(() => {
    if (parsedData) {
      let sevenDaysRates = parsedData
        .slice(parsedData.length - 7, parsedData.length)
        .map((a) => a["newPeopleVaccinatedFirstDoseByPublishDate"]);

      const sevenDaysRate_ = _.mean(sevenDaysRates);
      setSevenDaysRate(sevenDaysRate_);

      const daysToTarget_ = moment(targetDate)
        .startOf("day")
        .diff(
          moment(Date(parsedData[parsedData.length - 1]["date"])).startOf(
            "day"
          ),
          "days"
        );
      setDaysToTarget(daysToTarget_);

      setPredictedDaysToTarget(
        Math.round(
          (targetIndividuals -
            parsedData[parsedData.length - 1][
              "cumPeopleVaccinatedFirstDoseByPublishDate"
            ]) /
            sevenDaysRate_
        )
      );

      setPercentCompletion(
        (parsedData[parsedData.length - 1][
          "cumPeopleVaccinatedFirstDoseByPublishDate"
        ] /
          targetIndividuals) *
          100
      );
    }
  }, [parsedData]);

  if (parsedData) {
    let progressContent;

    console.log(daysToTarget);
    console.log(predictedDaysToTarget);

    if (predictedDaysToTarget > daysToTarget) {
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
            <b>{predictedDaysToTarget - daysToTarget} days</b>
          </div>
        </Fragment>
      );
    } else if (predictedDaysToTarget < daysToTarget) {
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
            <b> {Math.abs(predictedDaysToTarget - daysToTarget)} days</b>
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
        <Segment basic style={{ maxWidth: "200px" }}>
          <Header as="h4" textAlign="center">
            <Header.Content>{title}</Header.Content>
            <Header.Subheader>
              {`${targetIndividuals / 1000000}M 1st doses by ${moment(
                targetDate
              ).format("DD MMM")}`}
            </Header.Subheader>
          </Header>
          <CircularProgressbarWithChildren value={percentCompletion}>
            {progressContent}
          </CircularProgressbarWithChildren>
        </Segment>
      </Grid.Column>
    );
  } else return null;
};

export default ScoreCard;
