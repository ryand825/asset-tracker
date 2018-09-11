import * as React from "react";
import "./App.css";

import { Router } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import NavBar from "./components/Navigation/NavBar";
import Customers from "./components/Customers/Customers";

export default class App extends React.Component {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ loading, data }) => {
          if (loading) {
            return "Loading";
          } else {
            const userData = { ...data.getCurrentUser };
            console.log(userData);
            return (
              <>
                <NavBar groups={[{ id: userData.id, name: userData.name }]} />
                <Router>
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
