import React, { useState, useEffect, Fragment } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";

const ScoreCardWithDebt = ({
  debtData,
  parsedData,
  targetDate,
  targetIndividuals,
  title,
  doseType,
  predictionCallback,
  visible,
}) => {
  const [eventDay, setEventDay] = useState(null);
  const [dosesColumn, setDosesColumn] = useState(null);

  useEffect(() => {
    if (debtData) {
      if (doseType === "first") {
        setEventDay(
          debtData.find((datum) => datum.cumFirstDoses >= targetIndividuals)
        );
        setDosesColumn("cumPeopleVaccinatedFirstDoseByPublishDate");
      } else {
        setEventDay(
          debtData.find((datum) => datum.cumSecondDoses >= targetIndividuals)
        );
        setDosesColumn("cumPeopleVaccinatedSecondDoseByPublishDate");
      }
    }
  }, [debtData]);

  useEffect(() => {
    if (eventDay)
      predictionCallback({
        eventDay: eventDay,
        delta: Math.round(
          moment(eventDay.date).diff(moment(targetDate), "days")
        ),
      });
  }, [eventDay]);

  if (eventDay && parsedData) {
    let progressContent;

    const delta = Math.round(
      moment(eventDay.date).diff(moment(targetDate), "days")
    );

    if (!targetDate) {
      progressContent = (
        <Fragment>
          <div
            style={{
              marginTop: -5,
              fontSize: 14,
              marginLeft: 25,
              marginRight: 25,
              textAlign: "center",
            }}
          >
            <b>{moment(eventDay.date).format("DD MMMM")}</b>
          </div>
        </Fragment>
      );
    } else if (delta > 0) {
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
            <p>({moment(eventDay.date).format("DD MMMM")})</p>
          </div>
        </Fragment>
      );
    } else if (delta < 0) {
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
            <p>({moment(eventDay.date).format("DD MMMM")})</p>
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

    if (!visible) return null;

    return (
      <Grid.Column width={4} textAlign="center">
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
                (parsedData[parsedData.length - 1][dosesColumn] /
                  targetIndividuals) *
                100
              }
            >
              {progressContent}
            </CircularProgressbarWithChildren>
          </Segment>
        </Grid>
      </Grid.Column>
    );
  } else return null;
  // return null;
};

export default ScoreCardWithDebt;
