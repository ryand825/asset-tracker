import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";

export interface CustomersProps {}

export default class Customers extends React.Component<CustomersProps, any> {
  public render() {
    return (
      <Query query={CUSTOMER_QUERY}>
        {({ loading, data }) => {
          console.log(data);
          // const locations = data.getCurrentUser.customers.locations;
          if (loading) {
            return "loading...";
          } else {
            return (
              <>
                <ListView
                  listData={
                    data.getCurrentUser.groups[0].customers[0].locations
                  }
                />
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
    getCurrentUser {
      groups {
        customers {
          locations {
            name
            address
          }
        }
      }
    }
  }
`;
