import React, { useEffect, useState, Fragment } from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ReferenceLine,
  Label,
  ComposedChart,
  Legend,
  Line,
  Text,
  Tooltip,
  LineChart,
  Bar,
  YAxis,
  BarChart,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Grid, Segment, Header } from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import _, { forEach } from "lodash";

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    // <g transform={`translate(${x},${y})`}>
    <text
      x={x}
      y={y}
      // x={0}
      // y={0}
      dx={-30}
      dy={16}
      // textAnchor="end"
      fill={"#666"}
      // transform="rotate(-35)"
    >
      {moment(payload.value).format("DD MMM YY")}
    </text>
    // </g>
  );
};

const SecondDoseDebt = ({
  parsedData,
  debtData,
  weeklyDebtData,
  rateForPredictions,
}) => {
  const [indexAllDone, setIndexAllDone] = useState(null);
  const [indexAllDoneWeekly, setIndexAllDoneWeekly] = useState(null);

  useEffect(() => {
    if (debtData) {
      const indexAllDone = debtData.findIndex(
        (item) =>
          item.cumFirstDoses >= 53000000 && item.cumSecondDoses >= 53000000
      );
      setIndexAllDone(indexAllDone);

      const indexAllDoneWeekly = weeklyDebtData.findIndex(
        (item) =>
          item.cumFirstDoses >= 53000000 && item.cumSecondDoses >= 53000000
      );
      setIndexAllDoneWeekly(indexAllDoneWeekly);
    }
  }, [parsedData, debtData, weeklyDebtData, rateForPredictions]);

  if (debtData && indexAllDone) {
    const dateStartPredicted = debtData.find((datum) => datum.predicted).date;
    const dateStartPredictedWeekly = weeklyDebtData.find(
      (datum) => datum.predicted
    ).weekFirstDay;

    console.log(dateStartPredictedWeekly);

    return (
      <Fragment>
        <Header as="h4">
          Cumulative Doses Predictions
          <Header.Subheader>
            Predictions for rate of{" "}
            <b>
              {Intl.NumberFormat("en").format(Math.round(rateForPredictions))}
            </b>{" "}
            combined doses a day
          </Header.Subheader>
        </Header>
        <ResponsiveContainer width="100%" height={375}>
          <LineChart
            // data={debtData.slice(0, indexAllDone + 5)}
            data={debtData.slice(0, indexAllDone + 5)}
            margin={{
              top: 10,
              right: 30,
              left: 25,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value, entry, index) => {
                switch (value) {
                  case "cumFirstDoses":
                    return "First Dose";

                  case "cumSecondDoses":
                    return "Second Dose";
                }
              }}
            />
            <XAxis
              dataKey="date"
              tick={<CustomizedAxisTick />}
              domain={[
                parsedData[0].date,
                parsedData[parsedData.length - 1].date,
              ]}
              label={{ dy: 30, value: "Reporting Date" }}
            />
            <YAxis
              type="number"
              domain={[0, 60000000]}
              tickFormatter={(value) => `${Math.round(value / 1e6)}M`}
              label={
                <Text x={0} y={0} dx={30} dy={270} offset={0} angle={-90}>
                  Individuals Vaccinated
                </Text>
              }
            />
            <Tooltip />

            <ReferenceLine
              stroke="blue"
              y="53000000"
              strokeDasharray="3 3"
              label={{
                position: "insideBottomLeft",
                value: "All Adults",
                fontSize: 16,
              }}
            />
            <ReferenceLine
              stroke="red"
              y="32000000"
              strokeDasharray="3 3"
              label={{
                position: "insideBottomLeft",
                value: "Priority Groups ",
                fontSize: 16,
              }}
            />
            <ReferenceArea
              x1={dateStartPredicted}
              x2={debtData[indexAllDone + 4].date}
              // y1={0}
              // y2={45000000}
              strokeWidth={5}
              label={{
                position: "insideTopLeft",
                value: "🔮 Predicted ➡️",
                fontSize: 16,
              }}
            />
            <Line
              dataKey="cumFirstDoses"
              dot={false}
              stroke="#8884d8"
              strokeWidth={3}
            />
            <Line
              dataKey="cumSecondDoses"
              dot={false}
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        <Header as="h4">
          Weekly Doses Prediction
          <Header.Subheader>
            Predictions for rate of{" "}
            <b>
              {Intl.NumberFormat("en").format(Math.round(rateForPredictions))}
            </b>{" "}
            combined doses a day
          </Header.Subheader>
        </Header>
        <ResponsiveContainer width="100%" height={375}>
          <BarChart
            data={weeklyDebtData.slice(0, indexAllDoneWeekly + 1)}
            margin={{
              top: 10,
              right: 30,
              left: 40,
              bottom: 30,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <Legend
              verticalAlign="top"
              height={36}
              formatter={(value, entry, index) => {
                switch (value) {
                  case "firstDosesDone":
                    return "First Dose";

                  case "secondDosesDone":
                    return "Second Dose";
                }
              }}
            /> */}
            <XAxis
              dataKey="weekFirstDay"
              tick={<CustomizedAxisTick />}
              // domain={
              //   (weeklyDebtData[0].date,
              //   weeklyDebtData[weeklyDebtData.length - 1].date)
              // }
              // label={{ dy: 30, value: "Week" }}
              type="category"
              // domain={["auto", "auto"]}
            />
            <YAxis
              label={
                <Text x={0} y={0} dx={30} dy={245} offset={0} angle={-90}>
                  Average Daily Vaccinations
                </Text>
              }
              tickFormatter={(value) =>
                new Intl.NumberFormat("en").format(value)
              }
            />
            <ReferenceArea
              x1={dateStartPredictedWeekly}
              x2={weeklyDebtData[indexAllDoneWeekly].weekFirstDay}
              // y1={0}
              // y2={45000000}
              strokeWidth={5}
              label={{
                position: "insideTopLeft",
                value: "🔮 Predicted ➡️",
                fontSize: 16,
              }}
            />
            <Bar dataKey="firstDosesDone" stackId="a" fill="#8884d8" />
            <Bar dataKey="secondDosesDone" stackId="a" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>

        {/* <ResponsiveContainer width="100%" height={375}>
          <LineChart
            data={debtData.slice(0, parsedData.length)}
            margin={{
              top: 10,
              right: 30,
              left: 25,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value, entry, index) => {
                switch (value) {
                  case "cumFirstDoses":
                    return "First Dose";

                  case "cumSecondDoses":
                    return "Second Dose";
                }
              }}
            />
            <XAxis
              dataKey="date"
              tick={<CustomizedAxisTick />}
              domain={[
                parsedData[0].date,
                parsedData[parsedData.length - 1].date,
              ]}
              label={{ dy: 30, value: "Reporting Date" }}
            />
            <YAxis
              type="number"
              tickFormatter={(value) => `${Math.round(value / 1e6)}M`}
              label={
                <Text x={0} y={0} dx={30} dy={270} offset={0} angle={-90}>
                  Individuals Vaccinated
                </Text>
              }
            />
            <Tooltip />

            <Line
              dataKey="secondDosesDue"
              dot={false}
              stroke="#82ca9d"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={375}>
          <LineChart
            data={parsedData.slice(7, parsedData.length)}
            margin={{
              top: 10,
              right: 30,
              left: 25,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value, entry, index) => {
                switch (value) {
                  case "cumFirstDoses":
                    return "First Dose";

                  case "cumSecondDoses":
                    return "Second Dose";
                }
              }}
            />
            <XAxis
              dataKey="date"
              tick={<CustomizedAxisTick />}
              domain={[
                parsedData[0].date,
                parsedData[parsedData.length - 1].date,
              ]}
              label={{ dy: 30, value: "Reporting Date" }}
            />
            <YAxis
              type="number"
              tickFormatter={(value) => `${Math.round(value / 1e6)}M`}
              label={
                <Text x={0} y={0} dx={30} dy={270} offset={0} angle={-90}>
                  Individuals Vaccinated
                </Text>
              }
            />
            <Tooltip />

            <Line
              dataKey="newPeopleVaccinatedFirstDoseByPublishDate"
              dot={false}
              stroke="#82ca9d"
              strokeWidth={3}
            />
 
          </LineChart>
        </ResponsiveContainer> */}
      </Fragment>
    );
  } else return null;
};

export default SecondDoseDebt;
