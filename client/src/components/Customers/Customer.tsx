import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import ListView from "../common/ListView";
import Modal from "../common/Modal";
import Button from "../common/Button";
import DeleteDialog from "../common/DeleteDialog";
import cssVar from "../../variables";

export interface CustomerProps {
  path: string;
  customerId: string;
}

export default class Customer extends React.Component<CustomerProps, any> {
  state = { deleteMode: false };

  handleDelete = () => {
    this.setState({ deleteMode: true });
  };

  cancelDelete = () => {
    this.setState({ deleteMode: false });
  };
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

            const { name, id: customerId } = customer;

            return (
              <div>
                <Header>
                  <h3>{name}</h3>
                  {/* DELETE MUTATION */}
                  <Mutation
                    update={(
                      cache: any,
                      {
                        data: deleteCustomer
                      }: { data: { deleteCustomer: { id: string } } }
                    ) => {
                      const deleted = deleteCustomer.deleteCustomer;
                      const query = {
                        query: CUSTOMER_QUERY
                      };
                      const { getCustomersFromGroup } = cache.readQuery(query);
                      const newCustomerList = getCustomersFromGroup.filter(
                        (customer: { id: string }) => {
                          return customer.id !== deleted.id;
                        }
                      );
                      cache.writeQuery({
                        ...query,
                        data: {
                          getCustomersFromGroup: [...newCustomerList]
                        }
                      });
                    }}
                    mutation={DELETE_CUSTOMER}
                  >
                    {deleteCustomer => (
                      <>
                        <Button warning onClick={this.handleDelete}>
                          Delete
                        </Button>
                        {this.state.deleteMode && (
                          <>
                            <Modal onClick={this.cancelDelete} />
                            <DeleteDialog
                              redirectTo="/customers"
                              deleteName={name}
                              cancelFunction={this.cancelDelete}
                              deleteFunction={() =>
                                deleteCustomer({ variables: { customerId } })
                              }
                            />
                          </>
                        )}
                      </>
                    )}
                  </Mutation>
                </Header>
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

const Header = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    justify-content: flex-start;

    & h3 {
      margin-right: 2em;
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
  }
`;

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      name
      id
    }
  }
`;

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
