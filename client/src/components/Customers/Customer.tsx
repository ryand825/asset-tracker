import * as React from "react";
import { Query } from "react-apollo";

import ListPageHeader from "../common/ListPageHeader";
import ListView from "../common/ListView";
import CreateFirst from "../common/CreateFirst";
import CreateLocation from "../Create/CreateLocation";
import DeleteCustomer from "../Delete/DeleteCustomer";
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
                <ListPageHeader title={name} deleteToggle={this.deleteToggle} />
                {deleteMode && (
                  <DeleteCustomer
                    customerId={customerId}
                    cancelDelete={this.deleteToggle}
                    customerName={name}
                    groupId={groupId}
                  />
                )}
                {locationData.length > 0 ? (
                  <>
                    <ListView
                      listData={locationData}
                      linkTo="location"
                      openCreateMode={this.openCreateMode}
                    />
                  </>
                ) : (
                  <CreateFirst
                    name={"Location"}
                    onClick={this.openCreateMode}
                  />
                )}
                {isCreateMode && (
                  <CreateLocation
                    customerId={customerId}
                    closeCreateMode={this.closeCreateMode}
                  />
                )}
              </div>
            );
          }
        }}
      </Query>
    );
  }
}
