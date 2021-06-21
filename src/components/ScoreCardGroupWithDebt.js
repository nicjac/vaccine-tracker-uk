import React, { Fragment, useState } from "react";
import {
  TARGET_ALL_GROUPS_DATE,
  TARGET_ALL_GROUPS_INDIVIDUALS,
  TARGET_ADULT_POPULATION_DATE,
  TARGET_ADULT_POPULATION_INDIVIDUALS,
} from "../data/ImportantValues";
import { Grid, Segment, Header, Icon, Divider } from "semantic-ui-react";
import moment from "moment";

import ScoreCardWithDebt from "./ScoreCardWithDebt";

const ScoreCardGroupWithDebt = ({
  parsedData,
  debtData,
  showTweets,
  dateUpdated,
}) => {
  const [predictionAdultsFirst, setPredictionAdultsFirst] = useState(null);
  const [predictionAdultsSecond, setPredictionAdultsSecond] = useState(null);
  const [predictionPriorityFirst, setPredictionPriorityFirst] = useState(null);
  const [predictionPrioritySecond, setPredictionPrioritySecond] =
    useState(null);

  return (
    <Grid stackable centered columns={3}>
      {/* <span></span>
      <Divider horizontal>First Doses</Divider> */}
      {showTweets &&
        predictionPriorityFirst &&
        predictionPriorityFirst.eventDay &&
        predictionPrioritySecond &&
        predictionPrioritySecond.eventDay && (
          <Fragment>
            <Segment textAlign="left">
              Targets scorecards 🎯 on {moment(dateUpdated).format("DD MMMM")}
              <br />
              <br />
              {predictionAdultsFirst.delta < 0 ? "✅" : "❌"}53M by 19 July (
              {Math.abs(predictionAdultsFirst.delta)} days{" "}
              {predictionAdultsFirst.delta < 0 ? "early" : "late"} on{" "}
              {moment(predictionAdultsFirst.eventDay.date).format("DD/MM")})
              <br />
              <br />
              Those predictions are for 1st doses, and take into account the
              current combined 7-day average as well as the growing second doses
              debt.
              <br />
              <br />
              #vaccine #COVIDVaccine
            </Segment>
            <Segment textAlign="left">
              🔮Predicted Timeline Update on{" "}
              {moment(dateUpdated).format("DD MMMM")}
              <br />
              <br />
              {moment(predictionAdultsFirst.eventDay.date).format("D MMMM")}
              ➡️All Adults received a 1st dose
              <br />
              {moment(predictionAdultsSecond.eventDay.date).format("D MMMM")}
              ➡️All Adults received 2 doses
              <br />
              <br />
              Based on current trends, supply, and second doses debt
            </Segment>
          </Fragment>
        )}
      <Grid.Row textAlign="center" centered>
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ALL_GROUPS_DATE}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
          doseType="first"
          predictionCallback={setPredictionPriorityFirst}
          visible={false}
        />
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ADULT_POPULATION_DATE}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="Adult Population"
          doseType="first"
          predictionCallback={setPredictionAdultsFirst}
          visible={true}
        />
      </Grid.Row>
      <Grid.Row textAlign="center" centered>
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
          doseType="second"
          predictionCallback={setPredictionPrioritySecond}
          visible={false}
        />
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="All Adults"
          doseType="second"
          predictionCallback={setPredictionAdultsSecond}
          visible={false}
        />
      </Grid.Row>
    </Grid>
  );
};
export default ScoreCardGroupWithDebt;
