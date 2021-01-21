import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  Label,
  ResponsiveContainer,
} from "recharts";
import {
  TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS,
  TARGET_ALL_GROUPS_INDIVIDUALS,
  TARGET_ADULT_POPULATION_INDIVIDUALS,
} from "../data/ImportantValues";

const CustomBarLabel = ({ x, y, fill, value, width, viewBox, height }) => {
  return (
    <text
      x={x + width}
      y={y}
      dx={14}
      dy={18}
      textAnchor="start"
      width={width}
      viewBox={viewBox}
      fill={fill}
      height={height}
      fontFamily={"Roboto"}
    >
      {`${(parseInt(value) / 1000000).toFixed(2)}M`}
    </text>
  );
};

const VaccinationProgressPlot = ({ parsedData }) => {
  if (parsedData) {
    const data = [parsedData[parsedData.length - 1]];

    return (
      <ResponsiveContainer width={"100%"} height={150}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis type="number" domain={[0, 66000000]} hide />
          <YAxis type="category" domain={[0, 0]} tick={false} hide />
          <Legend
            verticalAlign="top"
            height={50}
            align="center"
            wrapperStyle={{
              paddingLeft: "0px",
            }}
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
          <Bar
            dataKey="cumPeopleVaccinatedFirstDoseByPublishDate"
            fill="#8884d8"
            background={{ fill: "#eee" }}
            label={<CustomBarLabel />}
          />
          <Bar
            dataKey="cumPeopleVaccinatedSecondDoseByPublishDate"
            fill="#82ca9d"
            background={{ fill: "#eee" }}
            label={<CustomBarLabel />}
          />
          <ReferenceLine
            x={TARGET_4_TOP_PRIORITY_GROUPS_INDIVIDUALS}
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label
              value="Top 4 Priority Groups"
              position="top"
              fontSize="15"
              fontStyle="bold"
              fontFamily={"Roboto"}
            />
          </ReferenceLine>
          <ReferenceLine
            x={TARGET_ALL_GROUPS_INDIVIDUALS}
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label
              value="All Priority Groups"
              position="bottom"
              fontSize="15"
              fontStyle="bold"
              fontFamily={"Roboto"}
            />
          </ReferenceLine>
          <ReferenceLine
            x={TARGET_ADULT_POPULATION_INDIVIDUALS}
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label
              value="Adult Population"
              position="top"
              fontSize="15"
              // dx={-60}
              fontStyle="bold"
              fontFamily={"Roboto"}
            />
          </ReferenceLine>
        </BarChart>
      </ResponsiveContainer>
    );
  } else return null;
};

export default VaccinationProgressPlot;
