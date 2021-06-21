import React, { Fragment } from "react";
import {
  Container,
  Header,
  Image,
  Segment,
  Icon,
  List,
  Message,
  Form,
  Input,
  Dropdown,
} from "semantic-ui-react";
import moment from "moment";

export const generateTweetHistoricalData = (
  parsedData,
  statistics,
  updateDate
) => {
  return (
    <Fragment>
      <Segment textAlign="left">
        {moment(updateDate).format("DD MMMM")} UK Vaccine Progress Tracker
        <br />
        <br />
        1️⃣ 1st Dose (Adults)
        <br />
        {"▓".repeat(
          Math.ceil(statistics.firstDosesStatistics.adultPopulationDone * 20)
        )}
        {"░".repeat(
          20 -
            Math.ceil(statistics.firstDosesStatistics.adultPopulationDone * 20)
        )}{" "}
        {(statistics.firstDosesStatistics.adultPopulationDone * 100).toFixed(0)}
        %
        <br />
        <br />
        2️⃣ 2nd Dose (Adults)
        <br />
        {"▓".repeat(
          Math.ceil(statistics.secondDosesStatistics.adultPopulationDone * 20)
        )}
        {"░".repeat(
          20 -
            Math.ceil(statistics.secondDosesStatistics.adultPopulationDone * 20)
        )}{" "}
        {(statistics.secondDosesStatistics.adultPopulationDone * 100).toFixed(
          0
        )}
        %
        <br />
        <br />
        #vaccine #vaccination #VaccinesWork
      </Segment>
      <Segment textAlign="left">
        1️⃣+2️⃣ All Doses Update on {moment(updateDate).format("DD MMMM")} 📢
        <br />
        <br />
        {Intl.NumberFormat("en").format(statistics.allDosesStatistics.new)} new
        doses administered yesterday (
        {moment(updateDate).subtract(1, "days").format("DD MMMM")}) across the
        UK🇬🇧
        <br />
        <br />
        Total Doses:{" "}
        {Intl.NumberFormat("en").format(statistics.allDosesStatistics.total)}
        <br />
        <br />
        {statistics.allDosesStatistics.newDayOnDayPercent > 0 ? "📈+" : "📉-"}
        {Math.abs(
          Math.round(statistics.allDosesStatistics.newDayOnDayPercent * 100)
        )}
        % day on day rate <br />
        {statistics.allDosesStatistics.newWeekOnWeekPercent > 0 ? "📈+" : "📉-"}
        {Math.abs(
          Math.round(statistics.allDosesStatistics.newWeekOnWeekPercent * 100)
        )}
        % week on week rate <br />
        {statistics.allDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "📈"
          : "📉"}
        7-day average of{" "}
        {Intl.NumberFormat("en").format(
          Math.round(statistics.allDosesStatistics.sevenDaysRate)
        )}{" "}
        (
        {statistics.allDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "+"
          : "-"}
        {Math.abs(
          Math.round(
            statistics.allDosesStatistics.sevenDaysRateWeekOnWeekPercent * 100
          )
        )}
        % week on week)
        <br />
        <br />
        #vaccine #COVID19
      </Segment>
      <Segment textAlign="left">
        1️⃣ First Doses Update on {moment(updateDate).format("DD MMMM")} 📢
        <br />
        <br />
        {Intl.NumberFormat("en").format(
          statistics.firstDosesStatistics.new
        )}{" "}
        new doses administered yesterday (
        {moment(updateDate).subtract(1, "days").format("DD MMMM")}) across the
        UK🇬🇧
        <br />
        <br />
        Total 1st Doses:{" "}
        {Intl.NumberFormat("en").format(statistics.firstDosesStatistics.total)}
        <br />
        <br />
        {statistics.firstDosesStatistics.newDayOnDayPercent > 0 ? "📈+" : "📉-"}
        {Math.abs(
          Math.round(statistics.firstDosesStatistics.newDayOnDayPercent * 100)
        )}
        % day on day rate <br />
        {statistics.firstDosesStatistics.newWeekOnWeekPercent > 0
          ? "📈+"
          : "📉-"}
        {Math.abs(
          Math.round(statistics.firstDosesStatistics.newWeekOnWeekPercent * 100)
        )}
        % week on week rate <br />
        {statistics.firstDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "📈"
          : "📉"}
        7-day average of{" "}
        {Intl.NumberFormat("en").format(
          Math.round(statistics.firstDosesStatistics.sevenDaysRate)
        )}{" "}
        (
        {statistics.firstDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "+"
          : "-"}
        {Math.abs(
          Math.round(
            statistics.firstDosesStatistics.sevenDaysRateWeekOnWeekPercent * 100
          )
        )}
        % week on week)
        <br />
        <br />
        #vaccine #COVID19
      </Segment>
      <Segment textAlign="left">
        2️⃣ Second Doses Update on {moment(updateDate).format("DD MMMM")} 📢
        <br />
        <br />
        {Intl.NumberFormat("en").format(
          statistics.secondDosesStatistics.new
        )}{" "}
        new doses administered yesterday (
        {moment(updateDate).subtract(1, "days").format("DD MMMM")}) across the
        UK🇬🇧
        <br />
        <br />
        Total 2nd Doses:{" "}
        {Intl.NumberFormat("en").format(statistics.secondDosesStatistics.total)}
        <br />
        <br />
        {statistics.secondDosesStatistics.newDayOnDayPercent > 0
          ? "📈+"
          : "📉-"}
        {Math.abs(
          Math.round(statistics.secondDosesStatistics.newDayOnDayPercent * 100)
        )}
        % day on day rate <br />
        {statistics.secondDosesStatistics.newWeekOnWeekPercent > 0
          ? "📈+"
          : "📉-"}
        {Math.abs(
          Math.round(
            statistics.secondDosesStatistics.newWeekOnWeekPercent * 100
          )
        )}
        % week on week rate <br />
        {statistics.secondDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "📈"
          : "📉"}
        7-day average of{" "}
        {Intl.NumberFormat("en").format(
          Math.round(statistics.secondDosesStatistics.sevenDaysRate)
        )}{" "}
        (
        {statistics.secondDosesStatistics.sevenDaysRateWeekOnWeekPercent > 0
          ? "+"
          : "-"}
        {Math.abs(
          Math.round(
            statistics.secondDosesStatistics.sevenDaysRateWeekOnWeekPercent *
              100
          )
        )}
        % week on week)
        <br />
        <br />
        #vaccine #COVID19
      </Segment>
    </Fragment>
  );
};
