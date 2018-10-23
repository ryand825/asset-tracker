import gql from "graphql-tag";

export const CUSTOMER_QUERY = gql`
  query getCustomersFromGroup($groupId: ID!) {
    getCustomersFromGroup(groupId: $groupId) {
      id
      name
      locations {
        id
      }
      group {
        id
      }
    }
    defaultGroupId @client
  }
`;

export const SINGLE_CUSTOMER_QUERY = gql`
  query getCustomerById($customerId: ID!) {
    getCustomerById(customerId: $customerId) {
      name
      id
      locations {
        id
        name
        address
      }
    }
    defaultGroupId @client
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($groupId: ID!, $name: String!) {
    createCustomer(groupId: $groupId, name: $name) {
      id
      name
      locations {
        id
      }
      group {
        id
      }
    }
    defaultGroupId @client
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      name
      id
    }
  }
`;
