import * as React from "react";
import { Mutation } from "react-apollo";

import { SINGLE_CUSTOMER_QUERY } from "../../gql/customer";
import { DELETE_LOCATION } from "../../gql/location";
import DeleteDialog from "./DeleteDialog";

export interface DeleteLocationProps {
  cancelDelete: () => void;
  customerId: string;
  locationId: string;
  locationName: string;
}

export default class DeleteLocation extends React.Component<
  DeleteLocationProps,
  any
> {
  public render() {
    const { cancelDelete, customerId, locationId, locationName } = this.props;
    return (
      <Mutation
        update={(
          cache: any,
          { data: deleteLocation }: { data: { deleteLocation: { id: string } } }
        ) => {
          console.log(deleteLocation);
          const deleted = deleteLocation.deleteLocation;
          const query = {
            query: SINGLE_CUSTOMER_QUERY,
            variables: { customerId }
          };
          const { getCustomerById } = cache.readQuery(query);
          console.log(getCustomerById);
          const newLocationList = getCustomerById.locations.filter(
            (location: { id: string }) => {
              return location.id !== deleted.id;
            }
          );
          cache.writeQuery({
            ...query,
            data: {
              getCustomerById: {
                ...getCustomerById,
                locations: [...newLocationList]
              }
            }
          });
        }}
        mutation={DELETE_LOCATION}
      >
        {deleteLocation => (
          <>
            <DeleteDialog
              redirectTo={`/customer/${customerId}`}
              deleteName={locationName}
              cancelFunction={cancelDelete}
              deleteFunction={() =>
                deleteLocation({ variables: { locationId } })
              }
            />
          </>
        )}
      </Mutation>
    );
  }
}
