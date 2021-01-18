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
import { readString } from "react-papaparse";
import StackedVaccinationPlot from "./components/StackedVaccinationPlot";
import VaccinationProgressPlot from "./components/VaccinationProgressPlot";
import DailyRatesPlot from "./components/DailyRatesPlot";
import GenericContainer from "./components/GenericContainer";
import logo from "./assets/logo.png";

function App() {
  const [rawData, setRawData] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    fetch("./data/PHE-vaccination/data_2021-Jan-17.csv", { mode: "no-cors" })
      .then((response) => response.text())
      .then((data) => setRawData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (rawData) {
      const results = readString(rawData, {
        header: true,
      });

      let raw_data = results.data;

      raw_data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      setParsedData(raw_data);
    }
  }, [rawData]);

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
          ChildComponent={<VaccinationProgressPlot parsedData={parsedData} />}
          title="Rollout Tracker"
          description="Breakdown of the overall COVID vaccine rollout in the UK for 1st and 2nd doses."
          dateUpdated="17/01/2021"
        />
        <GenericContainer
          ChildComponent={<StackedVaccinationPlot parsedData={parsedData} />}
          title="Cumulative Doses Administered Over Time"
          description="Cumulative first and second doses administered since 11 January
          2021."
          dateUpdated="17/01/2021"
        />
        <GenericContainer
          ChildComponent={<DailyRatesPlot parsedData={parsedData} />}
          title="Daily Vaccination Rates"
          description="Daily vaccination rates for 1st and 2nd doses since 11 January 2021."
          dateUpdated="17/01/2021"
        />
      </Container>
    </div>
  );
}

export default App;
