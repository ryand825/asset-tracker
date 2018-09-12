import * as React from "react";
import "./App.css";

import { Router } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import NavBar from "./components/Navigation/NavBar";
import Customers from "./components/Customers/Customers";
import Dashboard from "./components/Dashboard/Dashboard";

export default class App extends React.Component {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ loading, data, client }) => {
          if (loading) {
            return "Loading";
          } else {
            const userData = { ...data.getCurrentUser };
            const { groups, defaultGroup } = userData;
            return (
              <>
                <NavBar groups={groups} defaultGroup={defaultGroup} />
                <Router>
                  <Dashboard path="/dashboard" />
                  <Customers path="/customers" />
                </Router>
              </>
            );
          }
        }}
      </Query>
    );
  }
}

const GET_USER = gql`
  query {
    getCurrentUser {
      id
      name
      groups {
        id
        name
      }
      defaultGroup {
        id
        name
      }
    }
  }
`;
