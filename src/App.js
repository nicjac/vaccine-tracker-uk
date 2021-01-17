import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { readString } from "react-papaparse";
import StackedVaccinationPlot from "./components/StackedVaccinationPlot";
import VaccineStatistics from "./components/VaccineStatistics";
import VaccinationProgressPlot from "./components/VaccinationProgressPlot";

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
        {/* <VaccineStatistics parsedData={parsedData} /> */}
        <VaccinationProgressPlot parsedData={parsedData} />
        <StackedVaccinationPlot parsedData={parsedData} />
      </Container>
    </div>
  );
}

export default App;
