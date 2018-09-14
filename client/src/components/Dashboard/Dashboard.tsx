import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import DashList from "./DashList";

export interface DashboardProps {
  path: string;
}

export default class Dashboard extends React.Component<DashboardProps, any> {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ data }) => {
          const defaultGroupId = data.getCurrentUser.defaultGroup.id;
          return (
            <Query
              query={GET_LATEST_UPDATES}
              variables={{ groupId: defaultGroupId }}
            >
              {({ loading, data }) => {
                if (loading) {
                  return <div>Loading...</div>;
                } else {
                  console.log(data);
                  const {
                    customers,
                    assets,
                    locations
                  } = data.getLatestUpdates;
                  return (
                    <>
                      <DashList listData={customers} />
                      <DashList listData={locations} />
                      <DashList listData={assets} />
                    </>
                  );
                }
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

const GET_USER = gql`
  query {
    getCurrentUser @client {
      defaultGroup {
        id
        name
      }
    }
  }
`;

const GET_LATEST_UPDATES = gql`
  query getLatestUpdates($groupId: ID!) {
    getLatestUpdates(groupId: $groupId, last: 5) {
      customers {
        name
        updatedAt
        id
      }
      locations {
        name
        updatedAt
        id
        customer {
          name
        }
      }
      assets {
        serial
        updatedAt
        id
        equipment {
          name
        }
      }
    }
  }
`;
