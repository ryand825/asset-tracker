import * as React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import ListView from "../common/ListView";
import CreateLocation from "../Create/CreateLocation";
import Button from "../common/Button";
// import DeleteDialog from "../Delete/DeleteDialog";
import DeleteCustomer from "../Delete/DeleteCustomer";
import cssVar from "../../variables";
import { SINGLE_CUSTOMER_QUERY } from "../../gql/customer";

export interface CustomerProps {
  path: string;
  customerId?: string;
  groupId: string;
}

export interface CustomerState {
  deleteMode: boolean;
  isCreateMode: boolean;
}

export default class Customer extends React.Component<
  CustomerProps,
  CustomerState
> {
  state = { deleteMode: false, isCreateMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };

  deleteToggle = () => {
    this.setState((prevState: CustomerState) => {
      return { deleteMode: !prevState.deleteMode };
    });
  };
  public render() {
    const { isCreateMode, deleteMode } = this.state;
    const { groupId } = this.props;
    return (
      <Query
        query={SINGLE_CUSTOMER_QUERY}
        variables={{ customerId: this.props.customerId }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else {
            const { getCustomerById: customer } = data;
            const locationData = customer.locations.map(
              (location: { id: string; name: string; address: string }) => {
                return {
                  locations: location.name,
                  address: location.address,
                  id: location.id
                };
              }
            );
            const {
              name,
              id: customerId
            }: { name: string; id: string } = customer;
            return (
              <div>
                <Header>
                  <h3>{name}</h3>

                  <Button warning onClick={this.deleteToggle}>
                    Delete
                  </Button>
                  {deleteMode && (
                    <DeleteCustomer
                      customerId={customerId}
                      cancelDelete={this.deleteToggle}
                      customerName={name}
                      groupId={groupId}
                    />
                  )}
                </Header>
                {locationData.length > 0 ? (
                  <>
                    <ListView
                      listData={locationData}
                      linkTo="location"
                      openCreateMode={this.openCreateMode}
                    />
                    {isCreateMode && (
                      //TODO: create location
                      <CreateLocation
                        customerId={customerId}
                        closeCreateMode={this.closeCreateMode}
                      />
                    )}
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
