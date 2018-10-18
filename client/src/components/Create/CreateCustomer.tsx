import * as React from "react";
import gql from "graphql-tag";

import Creator from "./Creator";

export interface CreateLocationProps {
  closeCreateMode: () => void;
  updateQuery: any;
}

export default class CreateLocation extends React.Component<
  CreateLocationProps,
  any
> {
  public render() {
    const { closeCreateMode, updateQuery: CUSTOMER_QUERY } = this.props;
    return (
      <div>
        <Creator
          mutation={CREATE_CUSTOMER}
          closeCreateMode={closeCreateMode}
          fields={["name"]}
          update={(
            cache: any,
            { data: createCustomer }: { data: { createCustomer: {} } }
          ) => {
            const newCustomer = createCustomer.createCustomer;
            const query = {
              query: CUSTOMER_QUERY
            };
            const { getCustomersFromGroup } = cache.readQuery(query);
            cache.writeQuery({
              ...query,
              data: {
                getCustomersFromGroup: [...getCustomersFromGroup, newCustomer]
              }
            });
          }}
        />
      </div>
    );
  }
}

const CREATE_CUSTOMER = gql`
  mutation createCustomer($groupId: ID!, $name: String!) {
    createCustomer(groupId: $groupId, name: $name) {
      id
      name
      locations {
        id
      }
      group {
        id
      }
    }
    defaultGroupId @client
  }
`;
