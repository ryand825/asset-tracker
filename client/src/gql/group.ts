import gql from "graphql-tag";

export const GET_GROUP_ID = gql`
  query {
    defaultGroupId @client
  }
`;
