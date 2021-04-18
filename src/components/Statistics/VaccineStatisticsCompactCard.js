import React, { useState, useEffect, Fragment } from "react";
import {
  Statistic,
  Segment,
  Grid,
  Header,
  Icon,
  Card,
} from "semantic-ui-react";
import _ from "lodash";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VaccineStatisticsCompactCard = ({
  title,
  description,
  mainFigure,
  dayOnDay,
  dayOnDayPercent,
  weekOnWeek,
  weekOnWeekPercent,
  dataToPlot,
  disableDeltaRounding,
}) => {
  const getDayOnDay = () => {
    if (dayOnDay)
      return (
        <Fragment>
          {dayOnDay > 0 ? (
            <Icon color="green" name="arrow up" />
          ) : (
            <Icon color="red" name="arrow down" />
          )}
          Δ Day: &nbsp;
          {disableDeltaRounding ? (
            <b>{Intl.NumberFormat("en").format(dayOnDay.toFixed(1))}</b>
          ) : (
            <b>{Intl.NumberFormat("en").format(Math.round(dayOnDay))}</b>
          )}
          {dayOnDayPercent ? (
            <Fragment>
              &nbsp;(
              {(dayOnDayPercent * 100).toFixed(1)}
              %)
            </Fragment>
          ) : null}
          <br />
        </Fragment>
      );
    else return null;
  };

  const getWeekOnWeek = () => {
    if (weekOnWeek)
      return (
        <Fragment>
          {weekOnWeek > 0 ? (
            <Icon color="green" name="arrow up" />
          ) : (
            <Icon color="red" name="arrow down" />
          )}
          Δ Week: &nbsp;
          {disableDeltaRounding ? (
            <b>{Intl.NumberFormat("en").format(weekOnWeek.toFixed(1))}</b>
          ) : (
            <b>{Intl.NumberFormat("en").format(Math.round(weekOnWeek))}</b>
          )}
          {weekOnWeekPercent ? (
            <Fragment>
              &nbsp;(
              {(weekOnWeekPercent * 100).toFixed(1)}
              %)
            </Fragment>
          ) : null}
        </Fragment>
      );
    else return null;
  };

  const getPlot = () => {
    if (dataToPlot) {
      dataToPlot = dataToPlot.filter(
        (item) => item.data != null && item.data != 0
      );

      return (
        <BarChart
          width={250}
          height={50}
          data={dataToPlot}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" hide={true} />
          <Tooltip
            formatter={(value, name) => {
              return [new Intl.NumberFormat("en").format(value)];
            }}
          />
          <Bar type="monotone" dataKey="data" fill="#8884d8" />
        </BarChart>
      );
    } else return null;
  };

  return (
    <Card textAlign="left" compact>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{description}</Card.Meta>
        <Card.Description>
          <Statistic size="tiny">
            <Statistic.Value>{mainFigure}</Statistic.Value>
          </Statistic>
        </Card.Description>

        <Card.Description>
          {getDayOnDay()}
          {getWeekOnWeek()}
          {getPlot()}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default VaccineStatisticsCompactCard;
