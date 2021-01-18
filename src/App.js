import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { readString } from "react-papaparse";
import StackedVaccinationPlot from "./components/StackedVaccinationPlot";
import VaccineStatistics from "./components/VaccineStatistics";
import VaccinationProgressPlot from "./components/VaccinationProgressPlot";
import DailyRatesPlot from "./components/DailyRatesPlot";
import GenericContainer from "./components/GenericContainer";

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
