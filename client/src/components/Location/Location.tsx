import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListView from "../common/ListView";
import Notes from "../common/Notes";

export interface LocationProps {
  path: string;
  locationId: string;
}

export default class Location extends React.Component<LocationProps, any> {
  public render() {
    return (
      <Query
        query={SINGLE_LOCATION_QUERY}
        variables={{ locationId: this.props.locationId }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else {
            console.log(data);
            const {
              name,
              customer,
              address,
              assets,
              notes
            } = data.getLocationById;
            const listData = assets.map((asset: any) => {
              return {
                make: asset.equipment.name,
                model: asset.equipment.model,
                serial: asset.serial,
                description: asset.description,
                id: asset.id
              };
            });

            return (
              <>
                <h3>
                  {name} - {customer.name}
                </h3>
                <h4>{address}</h4>
                <ListView listData={listData} linkTo="asset" />
                <Notes notes={notes} />
              </>
            );
          }
        }}
      </Query>
    );
  }
}

const SINGLE_LOCATION_QUERY = gql`
  query getLocationById($locationId: ID!) {
    getLocationById(locationId: $locationId) {
      name
      id
      address
      notes {
        id
        content
        archived
        updatedAt
        createdBy {
          id
          name
        }
      }
      customer {
        id
        name
      }
      assets {
        serial
        description
        id
        equipment {
          name
          model
          id
        }
      }
    }
  }
`;
