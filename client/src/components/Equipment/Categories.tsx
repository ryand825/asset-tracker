import * as React from "react";
import { Query } from "react-apollo";

import { EQUIPMENT_CATEGORIES_QUERY } from "../../gql/equipment";
import ListPageHeader from "../common/ListPageHeader";
import ListView from "../common/ListView";
import CreateCategory from "./CreateCategory";

export interface CategoriesProps {
  path: string;
  groupId: string;
}

export default class Categories extends React.Component<CategoriesProps, any> {
  state = { deleteMode: false, isCreateMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };

  public render() {
    const { isCreateMode } = this.state;
    const { groupId } = this.props;
    return (
      <Query query={EQUIPMENT_CATEGORIES_QUERY} variables={{ groupId }}>
        {({ loading, data }) => {
          if (loading) {
            return "loading...";
          } else {
            const categoryData = data.getCategories.map(
              (category: { id: string; name: string; equipment: [] }) => {
                return {
                  categoryName: category.name,
                  equipment: category.equipment.length,
                  id: category.id
                };
              }
            );

            return (
              <>
                <ListPageHeader title="Equipment Categories" />
                <ListView
                  openCreateMode={this.openCreateMode}
                  listData={categoryData}
                  linkTo="equipment"
                />
                {isCreateMode && (
                  <CreateCategory
                    groupId={groupId}
                    updateQuery={EQUIPMENT_CATEGORIES_QUERY}
                    closeCreateMode={this.closeCreateMode}
                  />
                )}
              </>
            );
          }
        }}
      </Query>
    );
  }
}
