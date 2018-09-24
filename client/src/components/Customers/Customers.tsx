import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";

export interface CustomersProps {
  path: string;
}

export default class Customers extends React.Component<CustomersProps, any> {
  public render() {
    return (
      <Query query={CUSTOMER_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return "loading...";
          } else {
            const customerData = data.getCustomersFromGroup.map(
              (customer: { id: string; name: string; locations: [] }) => {
                return {
                  customerName: customer.name,
                  Locations: customer.locations.length,
                  id: customer.id
                };
              }
            );
            return (
              <>
                <ListView
                  listData={customerData}
                  linkTo="customer"
                  linkFrom={data.defaultGroupId}
                >
                  {this.props.children}
                </ListView>
              </>
            );
          }
        }}
      </Query>
    );
  }
}

const CUSTOMER_QUERY = gql`
  query {
    getCustomersFromGroup(groupId: "cjlms583gntq40b17a9ama6ae") {
      id
      name
      locations {
        id
      }
    }
    defaultGroupId @client
  }
`;
