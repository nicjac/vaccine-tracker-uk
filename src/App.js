import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Image,
  Segment,
  Icon,
  List,
} from "semantic-ui-react";
import StackedVaccinationPlot from "./components/StackedVaccinationPlot";
import VaccinationProgressPlot from "./components/VaccinationProgressPlot";
import DailyRatesPlot from "./components/DailyRatesPlot";
import GenericContainer from "./components/GenericContainer";
import ScoreCardGroup from "./components/ScoreCardGroup";

import logo from "./assets/logo.png";
import vaccination_json from "./data/vaccination-data.json";
import moment from "moment";

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);

  // Load, convert, and sort data
  useEffect(() => {
    let rawData = vaccination_json.data;

    // Sort by date (newer first)
    rawData.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    setParsedData(rawData);

    // Compute update date (assumed to be latest date in data + 1 day)
    const latestDate = rawData[rawData.length - 1].date;
    setUpdateDate(moment(latestDate).add(1, "d").format("DD MMMM YYYY"));
  }, []);

  return (
    <div className="App">
      <Container>
        <Header as="h1" textAlign="center">
          <Image src={logo} circular bordered />
          <Header.Content>Vaccine Tracker UK</Header.Content>
          <Header.Subheader>
            Visualisations to make sense of UK's COVID vaccine rollout
          </Header.Subheader>
        </Header>

        <Segment padded="very" raised size="large">
          <Header as="h2" dividing>
            <Icon name="question circle" />
            <Header.Content>
              About
              <Header.Subheader>
                What is this website? What is it for?
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Segment basic size="large">
            The aim of this website is to provide up-to-date visualisations to
            help better understand the progress of the UK's COVID vaccine
            rollout programme.
            <br />
            <List bulleted size="medium">
              <List.Item>
                Data kindly provided by{" "}
                <a href="https://coronavirus.data.gov.uk/">
                  Public Health England
                </a>{" "}
                (thank you for your hard work! 🤗)
              </List.Item>
              <List.Item>
                We provide daily updates on{" "}
                <a href="https://twitter.com/VaccineStatusUK">
                  Twitter <Icon name="twitter" />
                </a>
              </List.Item>
              <List.Item>
                We build in the open, check out our{" "}
                <a href="https://github.com/nicjac/vaccine-tracker-uk">
                  Github
                  <Icon name="github" />
                  respository!
                </a>
              </List.Item>
            </List>
          </Segment>
        </Segment>
        <GenericContainer
          ChildComponent={<ScoreCardGroup parsedData={parsedData} />}
          title="Government Target Score Card"
          description="Keeping track of the government targets. The dates and number of individuals are based on the UK COVID-19 Delivery Plan and the explainer by the Institute For Government."
          dateUpdated={updateDate}
        />
        <GenericContainer
          ChildComponent={<VaccinationProgressPlot parsedData={parsedData} />}
          title="Rollout Tracker"
          description="Breakdown of the overall COVID vaccine rollout in the UK for 1st and 2nd doses."
          dateUpdated={updateDate}
        />
        <GenericContainer
          ChildComponent={<StackedVaccinationPlot parsedData={parsedData} />}
          title="Cumulative Doses Administered Over Time"
          description="Cumulative first and second doses administered since 11 January
          2021."
          dateUpdated={updateDate}
        />
        <GenericContainer
          ChildComponent={<DailyRatesPlot parsedData={parsedData} />}
          title="Daily Vaccination Rates"
          description="Daily vaccination rates for 1st and 2nd doses since 11 January 2021."
          dateUpdated={updateDate}
        />
      </Container>
    </div>
  );
}

export default App;
