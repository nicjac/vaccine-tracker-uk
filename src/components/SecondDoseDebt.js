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
      dx={-18}
      dy={16}
      // textAnchor="end"
      fill={"#666"}
      // transform="rotate(-35)"
    >
      {moment(payload.value).format("DD MMM")}
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
  if (debtData)
    return (
      <Fragment>
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
            data={weeklyDebtData}
            margin={{
              top: 10,
              right: 30,
              left: 40,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
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
            />
            <XAxis
              dataKey="weekFirstDay"
              tick={<CustomizedAxisTick />}
              domain={[
                parsedData[0].date,
                parsedData[parsedData.length - 1].date,
              ]}
              label={{ dy: 30, value: "Week" }}
            />
            <YAxis
              label={
                <Text x={0} y={0} dx={30} dy={245} offset={0} angle={-90}>
                  Daily Vaccinations
                </Text>
              }
              tickFormatter={(value) =>
                new Intl.NumberFormat("en").format(value)
              }
            />
            <Bar dataKey="firstDosesDone" stackId="a" fill="#8884d8" />
            <Bar dataKey="secondDosesDone" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
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
            data={debtData}
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
              stroke="red"
              y="32000000"
              strokeDasharray="3 3"
              label={{
                position: "insideBottomLeft",
                value: "Priority Groups ",
                fontSize: 16,
              }}
            />
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
      </Fragment>
    );
  else return null;
};

export default SecondDoseDebt;
