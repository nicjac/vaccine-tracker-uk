import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Image,
  Segment,
  Icon,
  Card,
  List,
  Statistic,
  Message,
} from "semantic-ui-react";
import StackedVaccinationPlot from "./components/StackedVaccinationPlot";
import VaccinationProgressPlot from "./components/VaccinationProgressPlot";
import DailyRatesPlot from "./components/DailyRatesPlot";
import GenericContainer from "./components/GenericContainer";
import ScoreCardGroupWithDebt from "./components/ScoreCardGroupWithDebt";
import ScoreCardGroup from "./components/ScoreCardGroup";

import VaccineStatisticsCompact from "./components/VaccineStatisticsCompact";
import SecondDoseDebt from "./components/SecondDoseDebt";

import logo from "./assets/logo.png";
import vaccination_json from "./data/vaccination-data.json";
import moment from "moment";
import _ from "lodash";

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);

  const computeAverageRate = (data, days, fromKey, toKey) => {
    data.forEach((datum, index) => {
      if (index >= 6) {
        data[index][toKey] = _.mean(
          data.slice(index - (days - 1), index + 1).map((a) => a[fromKey])
        );
      } else data[index][toKey] = null;
    });

    return data;
  };

  // const computeAverageRateDual = (data, days, fromKey, toKey) => {
  //   data.forEach((datum, index) => {
  //     if (index >= 6) {
  //       data[index][toKey] = _.mean(
  //         data
  //           .slice(index - (days - 1), index + 1)
  //           .map((a) => a[fromKey[0]] + a[fromKey[1]])
  //       );
  //     } else data[index][toKey] = null;
  //   });

  //   return data;
  // };

  // Load, convert, and sort data
  useEffect(() => {
    let rawData = vaccination_json.data;

    // Sort by date (newer first)
    rawData.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    let parsedData = computeAverageRate(
      rawData,
      7,
      "newPeopleVaccinatedFirstDoseByPublishDate",
      "sevenDaysRate"
    );
    parsedData = computeAverageRate(
      parsedData,
      7,
      "newPeopleVaccinatedSecondDoseByPublishDate",
      "sevenDaysRateSecond"
    );
    // parsedData = computeAverageRateDual(
    //   parsedData,
    //   7,
    //   [
    //     "newPeopleVaccinatedSecondDoseByPublishDate",
    //     "newPeopleVaccinatedFirstDoseByPublishDate",
    //   ],
    //   "sevenDaysRateCombined"
    // );

    setParsedData(parsedData);

    // Compute update date (assumed to be latest date in data + 1 day)
    const latestDate = parsedData[parsedData.length - 1].date;
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
        <Message info>
          <Message.Header>Last Updated: {updateDate}</Message.Header>
          <p>
            This website is updated daily around 4pm BST (if delayed, check our{" "}
            <a href="https://twitter.com/VaccineStatusUK">
              Twitter <Icon name="twitter" />
              account
            </a>{" "}
            for more information)
          </p>
        </Message>
        <Segment raised size="large">
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
                This website is best viewed on a desktop, though we are doing
                our best to make it work as well as possible on mobile devices.
              </List.Item>
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
                  repository!
                </a>
              </List.Item>
            </List>
          </Segment>
        </Segment>

        <GenericContainer
          ChildComponent={<VaccineStatisticsCompact parsedData={parsedData} />}
          title="Rollout Dashboard"
          description="Key numbers related to the vaccination programme."
          dateUpdated={updateDate}
        />
        {/* <GenericContainer
          ChildComponent={<SecondDoseDebt parsedData={parsedData} />}
          title="Second Doses Debt"
          description="Visualisations related to the so-called second doses debt, in other words the number of second doses that will have to be administered to complete full courses of vaccination. The area plot on the left-hande side shows what the debt might look like and was generated by adding a 12-weeks delay from 1st doses."
          dateUpdated={updateDate}
        /> */}
        <GenericContainer
          ChildComponent={<ScoreCardGroupWithDebt parsedData={parsedData} />}
          title="Government Target Scorecard (Second Doses Debt Model)"
          description="Keeping track of the government targets. The dates and number of individuals are based on the UK COVID-19 Delivery Plan and the explainer by the Institute For Government. These predictions take into account the impact of the second doses debt. It is assumed that the rate is constant (equal to the last 7-day average for 1st and 2nd doses).
          A strict 12-week delay is introduced between 1st and 2nd doses. 2nd doses always take priority."
          dateUpdated={updateDate}
        />
        {/* <GenericContainer
          ChildComponent={<ScoreCardGroup parsedData={parsedData} />}
          title="Government Target Scorecard"
          description="Keeping track of the government targets. The dates and number of individuals are based on the UK COVID-19 Delivery Plan and the explainer by the Institute For Government. Prediction based on a 7-day vaccination rate average. The bar plots show deviation from target over time."
          dateUpdated={updateDate}
        /> */}
        <GenericContainer
          ChildComponent={<VaccinationProgressPlot parsedData={parsedData} />}
          title="Rollout Tracker"
          description="Breakdown of the overall COVID vaccine rollout in the UK for 1st and 2nd doses."
          dateUpdated={updateDate}
        />
        {/* <GenericContainer
          ChildComponent={<StackedVaccinationPlot parsedData={parsedData} />}
          title="Cumulative Doses Administered Over Time"
          description="Cumulative first and second doses administered since 11 January
          2021."
          dateUpdated={updateDate}
        /> */}
        <GenericContainer
          ChildComponent={<DailyRatesPlot parsedData={parsedData} />}
          title="Daily Vaccination Rates"
          description="Daily vaccination rates for 1st and 2nd doses since 11 January 2021. Dashed contours indicate weekend days."
          dateUpdated={updateDate}
        />
      </Container>
    </div>
  );
}

export default App;
