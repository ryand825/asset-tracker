import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";

export interface CustomerProps {
  path: string;
  customerId: string;
}

export default class Customer extends React.Component<CustomerProps, any> {
  public render() {
    return (
      <Query
        query={SINGLE_CUSTOMER_QUERY}
        variables={{ customerId: this.props.customerId }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else {
            const customer = data.getCustomerById;
            const locationData = customer.locations.map(
              (location: { id: string; name: string; address: string }) => {
                return {
                  locations: location.name,
                  address: location.address,
                  id: location.id
                };
              }
            );

            return (
              <div>
                <h3>{customer.name}</h3>
                {locationData.length > 0 ? (
                  <ListView listData={locationData} linkTo="location" />
                ) : (
                  "No Locations for this customer"
                )}
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

const SINGLE_CUSTOMER_QUERY = gql`
  query getCustomerById($customerId: ID!) {
    getCustomerById(customerId: $customerId) {
      name
      id
      locations {
        id
        name
        address
      }
    }
  }
`;
