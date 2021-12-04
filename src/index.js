import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Container,
  Message,
} from "semantic-ui-react";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Container>
    <Message info style={{marginTop:"200px"}}>
          <Message.Header>We will be back! </Message.Header>
          <p>
            This website has not been updated for some time due to technical difficulties. Instead of showing outdated information, we decied to take it offline until we get the time to resolve these issues. Until then,
            please visit the official <a href="https://coronavirus.data.gov.uk/">UK COVID dashboard</a> for updates. Be safe!
          </p>
        </Message>
        </Container>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
