import * as React from "react";
import { Mutation } from "react-apollo";

import { CUSTOMER_QUERY, DELETE_CUSTOMER } from "../../gql/customer";
import DeleteDialog from "./DeleteDialog";

export interface DeleteCustomerProps {
  cancelDelete: () => void;
  customerId: string;
  customerName: string;
  groupId: string;
}

export default class DeleteCustomer extends React.Component<
  DeleteCustomerProps,
  any
> {
  public render() {
    const { customerId, cancelDelete, customerName, groupId } = this.props;
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
              query: CUSTOMER_QUERY,
              variables: { groupId }
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
