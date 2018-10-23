import gql from "graphql-tag";

export const SINGLE_LOCATION_QUERY = gql`
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
    defaultGroupId @client
  }
`;

export const CREATE_LOCATION = gql`
  mutation createLocation($name: String!, $customerId: ID!, $address: String!) {
    createLocation(name: $name, customerId: $customerId, address: $address) {
      id
      name
      address
    }
  }
`;

export const CREATE_LOCATION_NOTE = gql`
  mutation addNote($locationId: ID!, $groupId: ID!, $content: String!) {
    createLocationNote(
      locationId: $locationId
      groupId: $groupId
      content: $content
    ) {
      id
      notes(last: 1) {
        id
        content
        archived
        updatedAt
        createdBy {
          id
          name
        }
      }
    }
  }
`;
