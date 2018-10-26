import * as React from "react";

import { CREATE_CATEGORY } from "../../gql/equipment";
import Creator from "../Create/Creator";

export interface CreateLocationProps {
  closeCreateMode: () => void;
  updateQuery: any;
  groupId: string;
}

export default class CreateLocation extends React.Component<
  CreateLocationProps,
  any
> {
  public render() {
    const {
      closeCreateMode,
      updateQuery: EQUIPMENT_CATEGORIES_QUERY,
      groupId
    } = this.props;
    return (
      <div>
        <Creator
          mutation={CREATE_CATEGORY}
          closeCreateMode={closeCreateMode}
          fields={["name", "description"]}
          update={(
            cache: any,
            { data: createCategory }: { data: { createCategory: {} } }
          ) => {
            const newCategory = {
              ...createCategory.createCategory,
              equipment: []
            };
            const query = {
              query: EQUIPMENT_CATEGORIES_QUERY,
              variables: { groupId }
            };
            const { getCategories } = cache.readQuery(query);
            cache.writeQuery({
              ...query,
              data: { getCategories: [...getCategories, newCategory] }
            });
          }}
        />
      </div>
    );
  }
}
