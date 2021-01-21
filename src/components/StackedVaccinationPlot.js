import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Text,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS } from "../data/ImportantValues";

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
      fill="#666"
      // transform="rotate(-35)"
    >
      {moment(payload.value).format("DD MMM")}
    </text>
    // </g>
  );
};

const StackedVaccinationPlot = ({ parsedData }) => {
  if (parsedData) {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={parsedData}
          margin={{
            top: 10,
            right: 30,
            left: 15,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value, entry, index) => {
              switch (value) {
                case "cumPeopleVaccinatedFirstDoseByPublishDate":
                  return "First Dose";

                case "cumPeopleVaccinatedSecondDoseByPublishDate":
                  return "Second Dose";

                default:
                  return "";
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
            domain={[0, 16000000]}
            tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
            label={
              <Text x={0} y={0} dx={20} dy={270} offset={0} angle={-90}>
                Individuals Vaccinated
              </Text>
            }
          />
          <Tooltip
            formatter={(value, name) => {
              switch (name) {
                case "cumPeopleVaccinatedFirstDoseByPublishDate":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "First Dose",
                  ];

                case "cumPeopleVaccinatedSecondDoseByPublishDate":
                  return [
                    new Intl.NumberFormat("en").format(value),
                    "Second Dose",
                  ];

                default:
                  return [null, null];
              }
            }}
          />
          <Area
            type="monotone"
            dataKey="cumPeopleVaccinatedFirstDoseByPublishDate"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="cumPeopleVaccinatedSecondDoseByPublishDate"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <ReferenceLine
            y={TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS}
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label value="Top 4 Priority Groups Target" position="top" />
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    );
  } else return null;
};

export default StackedVaccinationPlot;
