import gql from "graphql-tag";

export const EQUIPMENT_CATEGORIES_QUERY = gql`
  query getCategories($groupId: ID!) {
    getCategories(groupId: $groupId) {
      id
      name
      description
      equipment {
        id
      }
    }
  }
`;

export const EQUIPMENT_LIST_QUERY = gql`
  query getEquipmentList($categoryId: ID!) {
    getEquipmentList(categoryId: $categoryId) {
      id
      name
      model
      assets {
        id
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory(
    $name: String!
    $description: String!
    $groupId: ID!
  ) {
    createCategory(name: $name, description: $description, groupId: $groupId) {
      id
      name
      description
      group {
        id
      }
    }
  }
`;
