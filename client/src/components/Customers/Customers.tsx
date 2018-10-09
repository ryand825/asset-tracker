import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";
import CreateCustomer from "../Create/CreateCustomer";

export interface CustomersProps {
  path: string;
}

export interface createCustomer {
  test: {};
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
            const { defaultGroupId } = data;
            console.log(data);
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
                />
                {isCreateMode && (
                  <CreateCustomer
                    mutation={CREATE_CUSTOMER}
                    closeCreateMode={this.closeCreateMode}
                    fields={["name"]}
                    groupId={defaultGroupId}
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
                          getCustomersFromGroup: [
                            ...getCustomersFromGroup,
                            newCustomer
                          ]
                        }
                      });
                    }}
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
  query getCustomersFromGroup {
    getCustomersFromGroup(groupId: "cjlms583gntq40b17a9ama6ae") {
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
