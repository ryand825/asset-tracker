import * as React from "react";
import gql from "graphql-tag";

import Creator from "./Creator";

export interface CreateLocationProps {
  closeCreateMode: () => void;
  customerId: string;
}

export default class CreateLocation extends React.Component<
  CreateLocationProps,
  any
> {
  public render() {
    const { closeCreateMode, customerId } = this.props;
    return (
      <div>
        <Creator
          mutation={CREATE_LOCATION}
          closeCreateMode={closeCreateMode}
          fields={["name", "address"]}
          variables={{ customerId }}
          update={(
            cache: any,
            { data: createLocation }: { data: { createLocation: {} } }
          ) => {
            const newLocation = createLocation.createLocation;
            const query = {
              query: SINGLE_CUSTOMER_QUERY,
              variables: { customerId }
            };
            const { getCustomerById } = cache.readQuery(query);
            cache.writeQuery({
              ...query,
              data: {
                getCustomerById: {
                  ...getCustomerById,
                  locations: [...getCustomerById.locations, newLocation]
                }
              }
            });
          }}
        />
      </div>
    );
  }
}

const CREATE_LOCATION = gql`
  mutation createLocation($name: String!, $customerId: ID!, $address: String!) {
    createLocation(name: $name, customerId: $customerId, address: $address) {
      id
      name
      address
    }
  }
`;

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
    defaultGroupId @client
  }
`;
