import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Bar,
  Line,
  Cell,
  Text,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import moment from "moment";
import _ from "lodash";
import { useWindowSize } from "../hooks/WindowSize";

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

const DailyRatesPlot = ({ parsedData }) => {
  let windowSize = useWindowSize();

  const [brushInits, setBrushInits] = useState({ start: 0, end: 0 });

  useEffect(() => {
    if (windowSize.width < 800) {
      if (parsedData) setBrushInits({ start: parsedData.length - 30 });
      else setBrushInits({ start: 50 });
    }
  }, [windowSize]);

  console.log(windowSize);

  if (parsedData) {
    return (
      <ResponsiveContainer width="100%" aspect={2.5}>
        <ComposedChart
          data={parsedData}
          margin={{
            top: 10,
            right: 30,
            left: 45,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <Legend
            verticalAlign="top"
            height={36}
            formatter={(value, entry, index) => {
              switch (value) {
                case "newPeopleVaccinatedFirstDoseByPublishDate":
                  return "First Dose";

                case "newPeopleVaccinatedSecondDoseByPublishDate":
                  return "Second Dose";

                case "sevenDaysRateSecond":
                  return "Second Dose (7-day average)";

                default:
                  return "First Dose (7-day average)";
              }
            }}
          /> */}
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
            // domain={[0, 20000000]}
            tickFormatter={(value) => new Intl.NumberFormat("en").format(value)}
            label={
              <Text x={0} y={0} dx={30} dy={270} offset={0} angle={-90}>
                Individuals Vaccinated
              </Text>
            }
          />
          <Tooltip
            formatter={(value, name) => {
              switch (name) {
                case "newPeopleVaccinatedFirstDoseByPublishDate":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "First Dose",
                  ];

                case "newPeopleVaccinatedSecondDoseByPublishDate":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "Second Dose",
                  ];

                case "sevenDaysRateSecond":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "Second Dose (7-day average)",
                  ];

                case "sevenDaysRate":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "First Dose (7-day average)",
                  ];

                default:
                  return [null, null];
              }
            }}
          />
          <Bar
            type="monotone"
            dataKey="newPeopleVaccinatedFirstDoseByPublishDate"
            stackId="1"
            fill="#8884d8"
            stroke="#8884d8"
          >
            {parsedData.map((entry, index) =>
              moment(parsedData[index]["date"]).isoWeekday() === 6 ||
              moment(parsedData[index]["date"]).isoWeekday() === 7 ? (
                <Cell
                  // stroke={"#089c19"}
                  strokeWidth={4}
                  strokeDasharray={[3, 3]}
                />
              ) : (
                <Cell />
              )
            )}
          </Bar>
          <Bar
            type="monotone"
            dataKey="newPeopleVaccinatedSecondDoseByPublishDate"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="sevenDaysRate"
            stroke="#ff7300"
            strokeWidth={3}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="sevenDaysRateSecond"
            stroke="#81CA9C"
            strokeWidth={2}
            dot={true}
          />
          {/* <Brush
            dataKey="date"
            height={30}
            stroke="#8884d8"
            startIndex={brushInits.start}
          /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  } else return null;
};

export default DailyRatesPlot;
