import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const defaultState = {};

const client = new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults: defaultState,
    resolvers: {}
  },
  headers: { Authorization: localStorage.getItem("jwtToken") }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
