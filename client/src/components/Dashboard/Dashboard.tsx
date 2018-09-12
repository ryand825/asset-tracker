import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export interface DashboardProps {
  path: string;
}

export default class Dashboard extends React.Component<DashboardProps, any> {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ data }) => {
          console.log(data);
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
                  return (
                    <div>
                      <h3>Hello</h3>
                    </div>
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
        id
        name
        updatedAt
      }
      locations {
        id
        name
        updatedAt
      }
      assets {
        id
        serial
        updatedAt
      }
    }
  }
`;
