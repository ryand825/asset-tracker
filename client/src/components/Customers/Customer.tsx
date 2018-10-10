import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import ListView from "../common/ListView";
// import Create from "../Create/Create";
import Modal from "../common/Modal";
import Button from "../common/Button";
import DeleteDialog from "../common/DeleteDialog";
import cssVar from "../../variables";

export interface CustomerProps {
  path: string;
  customerId: string;
}

export default class Customer extends React.Component<CustomerProps, any> {
  state = { deleteMode: false, isCreateMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };

  handleDelete = () => {
    this.setState({ deleteMode: true });
  };

  cancelDelete = () => {
    this.setState({ deleteMode: false });
  };
  public render() {
    const { isCreateMode, deleteMode } = this.state;
    return (
      <Query
        query={SINGLE_CUSTOMER_QUERY}
        variables={{ customerId: this.props.customerId }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else {
            const { getCustomerById: customer, defaultGroupId } = data;
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
                        {deleteMode && (
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
                  <>
                    <ListView
                      listData={locationData}
                      linkTo="location"
                      openCreateMode={this.openCreateMode}
                    />
                    {isCreateMode &&
                      //TODO: create location
                      defaultGroupId}
                  </>
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
    defaultGroupId @client
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

// const CREATE_LOCATION = gql`
//   mutation createLocation($name: String, $customerId: ID!, $address: String) {
//     createLocation(name: $name, customerId: $customerId, address: $address) {
//       id
//       name
//       address
//     }
//   }
// `;

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
