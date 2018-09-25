import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";
import NewCustomer from "../Create/NewCustomer";

export interface CustomersProps {
  path: string;
}

export default class Customers extends React.Component<CustomersProps, any> {
  state = { isCreateMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };

  public render() {
    const { isCreateMode } = this.state;

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
                  openCreateMode={this.openCreateMode}
                  listData={customerData}
                  linkTo="customer"
                  // createOptions={{
                  //   inId: "cjlms583gntq40b17a9ama6ae",
                  //   fields: ["Name"],
                  //   mutation: CUSTOMER_QUERY
                  // }}
                />
                {isCreateMode && (
                  <NewCustomer
                    closeCreateMode={this.closeCreateMode}
                    fields={["Name"]}
                  />
                )}
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

// const CREATE_CUSTOMER = gql`
//   mutation createCustomer($groupId: ID!) {
//     createCustomer(groupId: $groupId)
//   }
// `;
