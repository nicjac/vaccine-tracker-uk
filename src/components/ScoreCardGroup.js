import React from "react";
import {
  TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS,
  TARGET_4_TOP_PRIORITY_GROUPS_DATE,
  TARGET_ALL_GROUPS_DATE,
  TARGET_ALL_GROUPS_INDIVIDUALS,
  TARGET_ADULT_POPULATION_DATE,
  TARGET_ADULT_POPULATION_INDIVIDUALS,
} from "../data/ImportantValues";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

import ScoreCard from "./ScoreCard";

const ScoreCardGroup = ({ parsedData }) => {
  return (
    <Grid stackable centered columns={3}>
      <Grid.Row textAlign="center" centered>
        {/* <ScoreCard
          parsedData={parsedData}
          targetDate={TARGET_4_TOP_PRIORITY_GROUPS_DATE}
          targetIndividuals={TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS}
          title="Top 4 Priority Groups"
        /> */}
        <ScoreCard
          parsedData={parsedData}
          targetDate={TARGET_ALL_GROUPS_DATE}
          targetIndividuals={TARGET_ALL_GROUPS_INDIVIDUALS}
          title="All Priority Groups"
        />
        <ScoreCard
          parsedData={parsedData}
          targetDate={TARGET_ADULT_POPULATION_DATE}
          targetIndividuals={TARGET_ADULT_POPULATION_INDIVIDUALS}
          title="Adult Population"
        />
      </Grid.Row>
    </Grid>
  );
};
export default ScoreCardGroup;
