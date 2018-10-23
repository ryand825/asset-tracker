import * as React from "react";
import { Query } from "react-apollo";

import { CUSTOMER_QUERY } from "../../gql/customer";
import ListView from "../common/ListView";
import CreateCustomer from "../Create/CreateCustomer";

export interface CustomersProps {
  path: string;
  groupId: string;
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
    const { groupId } = this.props;

    return (
      <Query query={CUSTOMER_QUERY} variables={{ groupId }}>
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
                />
                {isCreateMode && (
                  <CreateCustomer
                    groupId={groupId}
                    updateQuery={CUSTOMER_QUERY}
                    closeCreateMode={this.closeCreateMode}
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
