import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache();
const defaultState = {
  defaultGroupId: "",
  isCreateMode: false
};

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  const client = new ApolloClient({
    cache,
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
});
