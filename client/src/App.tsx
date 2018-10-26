import * as React from "react";
import "./App.css";

import { Router } from "@reach/router";
import { Query } from "react-apollo";

import { GET_USER } from "./gql/user";
import NavBar from "./components/Navigation/NavBar";
import Customers from "./components/Customers/Customers";
import Customer from "./components/Customers/Customer";
import Dashboard from "./components/Dashboard/Dashboard";
import Location from "./components/Location/Location";
import Categories from "./components/Equipment/Categories";
import EquipmentList from "./components/Equipment/EquipmentList";

export default class App extends React.Component {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ loading, data, client }) => {
          if (loading) {
            return "Loading";
          } else {
            const { groups, defaultGroup } = data.getCurrentUser;
            const { id: groupId }: { id: string } = defaultGroup;
            client.writeData({ data: { defaultGroupId: groupId } });
            return (
              <>
                <NavBar groups={groups} defaultGroup={defaultGroup} />
                <Router>
                  <Dashboard path="/dashboard" />
                  <Customers groupId={groupId} path="/customers">
                    {/* <NewCustomer path="/create/:groupId" /> */}
                  </Customers>
                  <Customer groupId={groupId} path="/customer/:customerId" />
                  <Location path="/location/:locationId" locationId="" />
                  <Categories groupId={groupId} path="/equipment" />
                  <EquipmentList path="/equipment/:categoryId" />
                </Router>
              </>
            );
          }
        }}
      </Query>
    );
  }
}
