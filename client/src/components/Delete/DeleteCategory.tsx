import * as React from "react";
import { Mutation } from "react-apollo";

import {
  EQUIPMENT_CATEGORIES_QUERY,
  DELETE_EQUIPMENT_CATEGORY
} from "../../gql/equipment";
import DeleteDialog from "./DeleteDialog";

export interface DeleteCategoryProps {
  cancelDelete: () => void;
  categoryId: string;
  categoryName: string;
  groupId: string;
}

export default class DeleteCategory extends React.Component<
  DeleteCategoryProps,
  any
> {
  public render() {
    const { categoryId, cancelDelete, categoryName, groupId } = this.props;
    return (
      <Mutation
        update={(
          cache: any,
          {
            data: deleteEquipmentCategory
          }: { data: { deleteEquipmentCategory: { id: string } } }
        ) => {
          const deleted = deleteEquipmentCategory.deleteEquipmentCategory;
          const query = {
            query: EQUIPMENT_CATEGORIES_QUERY,
            variables: { groupId }
          };
          const { getCategories } = cache.readQuery(query);
          const newCategoryList = getCategories.filter(
            (category: { id: string }) => {
              return category.id !== deleted.id;
            }
          );
          cache.writeQuery({
            ...query,
            data: {
              getCategories: [...newCategoryList]
            }
          });
        }}
        mutation={DELETE_EQUIPMENT_CATEGORY}
      >
        {deleteCustomer => (
          <>
            <DeleteDialog
              redirectTo="/equipment"
              deleteName={categoryName}
              cancelFunction={cancelDelete}
              deleteFunction={() =>
                deleteCustomer({ variables: { categoryId } })
              }
            />
          </>
        )}
      </Mutation>
    );
  }
}
