import React, { useEffect, useState } from "react";
import {
  TARGET_ALL_GROUPS_DATE,
  TARGET_ALL_GROUPS_INDIVIDUALS,
  TARGET_ADULT_POPULATION_DATE,
  TARGET_ADULT_POPULATION_INDIVIDUALS,
} from "../data/ImportantValues";
import { Grid, Segment, Header, Icon, Divider } from "semantic-ui-react";
import moment from "moment";

import ScoreCardWithDebt from "./ScoreCardWithDebt";

const ScoreCardGroupWithDebt = ({ parsedData, debtData }) => {
  return (
    <Grid stackable centered columns={3}>
      {/* <span></span>
      <Divider horizontal>First Doses</Divider> */}
      <Grid.Row textAlign="center" centered>
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ALL_GROUPS_DATE}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
          doseType="first"
        />
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetDate={TARGET_ADULT_POPULATION_DATE}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="Adult Population"
          doseType="first"
        />
      </Grid.Row>
      {/* <Divider horizontal>Second Doses</Divider>

      <Grid.Row textAlign="center" centered>
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
          doseType="second"
        />
        <ScoreCardWithDebt
          debtData={debtData}
          parsedData={parsedData}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="All Adults"
          doseType="second"
        />
      </Grid.Row> */}
    </Grid>
  );
};
export default ScoreCardGroupWithDebt;
