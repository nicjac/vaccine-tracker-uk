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
import { Card, Icon } from "semantic-ui-react";

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const StackedVaccinationPlot = ({ parsedData }) => {
  if (parsedData) {
    console.log(parsedData);
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Doses administered over time</Card.Header>
          <Card.Meta>
            Cumulative first and second doses administered since 11 January
            2021.
          </Card.Meta>
          <Card.Description>
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart
                data={parsedData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 100,
                  bottom: 100,
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
                  label={{ dy: 75, value: "Reporting Date" }}
                />
                <YAxis
                  domain={[0, 20000000]}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en").format(value)
                  }
                  label={
                    <Text x={0} y={0} dx={50} dy={270} offset={0} angle={-90}>
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
                <ReferenceLine y={15000000} stroke="red" strokeDasharray="3 3">
                  <Label value="Top 4 Priority Groups Target" position="top" />
                </ReferenceLine>
              </AreaChart>
            </ResponsiveContainer>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="database" />
          Data Source: Public Health England (Updated 17/01/2021)
        </Card.Content>
      </Card>
    );
  } else return null;
};

export default StackedVaccinationPlot;
