import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import DeleteDialog from "./DeleteDialog";

export interface DeleteCustomerProps {
  cancelDelete: () => void;
  customerId: string;
  customerName: string;
}

export default class DeleteCustomer extends React.Component<
  DeleteCustomerProps,
  any
> {
  public render() {
    const { customerId, cancelDelete, customerName } = this.props;
    return (
      <div>
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
              <DeleteDialog
                redirectTo="/customers"
                deleteName={customerName}
                cancelFunction={cancelDelete}
                deleteFunction={() =>
                  deleteCustomer({ variables: { customerId } })
                }
              />
            </>
          )}
        </Mutation>
      </div>
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

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      name
      id
    }
  }
`;
