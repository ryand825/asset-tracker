import * as React from "react";

import { CREATE_CUSTOMER } from "../../gql/customer";
import Creator from "./Creator";

export interface CreateLocationProps {
  closeCreateMode: () => void;
  updateQuery: any;
  groupId: string;
}

export default class CreateLocation extends React.Component<
  CreateLocationProps,
  any
> {
  public render() {
    const {
      closeCreateMode,
      updateQuery: CUSTOMER_QUERY,
      groupId
    } = this.props;
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
              query: CUSTOMER_QUERY,
              variables: { groupId }
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
