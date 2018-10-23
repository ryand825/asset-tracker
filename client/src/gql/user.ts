import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    getCurrentUser {
      id
      name
      groups {
        id
        name
      }
      defaultGroup {
        id
        name
      }
    }
    defaultGroupId @client
  }
`;
