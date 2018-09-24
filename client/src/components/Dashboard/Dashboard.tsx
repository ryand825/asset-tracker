import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import DashList from "./DashList";
import "./Dashboard.css";

export interface DashboardProps {
  path: string;
}

export default class Dashboard extends React.Component<DashboardProps, any> {
  public render() {
    let defaultGroupId = "";
    return (
      <Query query={GET_USER}>
        {({ loading, data }) => {
          if (loading) return "Loading...";
          console.log(data);
          defaultGroupId = data.getCurrentUser.defaultGroup.id;
          console.log(defaultGroupId);
          return (
            <Query
              query={GET_LATEST_UPDATES}
              variables={{ groupId: defaultGroupId }}
              // fetchPolicy="no-cache"
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
                      <h3 className="dash-header">Recent Updates</h3>
                      <div className="dashboard-container">
                        <DashList listData={locations} />
                        <DashList listData={customers} />
                        <DashList listData={assets} />
                      </div>
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
    getCurrentUser {
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
          id
          name
        }
      }
      assets {
        serial
        updatedAt
        id
        equipment {
          id
          name
        }
      }
    }
  }
`;
