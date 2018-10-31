import * as React from "react";
import { Query } from "react-apollo";

import { EQUIPMENT_LIST_QUERY } from "../../gql/equipment";
import CreateFirst from "../common/CreateFirst";
import ListPageHeader from "../common/ListPageHeader";
import ListView from "../common/ListView";
import DeleteCategory from "../Delete/DeleteCategory";

export interface EquipmentListProps {
  categoryId: string;
  path: string;
  groupId: string;
}

export default class EquipmentList extends React.Component<
  EquipmentListProps,
  any
> {
  state = { isCreateMode: false, deleteMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };

  deleteToggle = () => {
    this.setState((prevState: { deleteMode: boolean }) => {
      return { deleteMode: !prevState.deleteMode };
    });
  };

  public render() {
    const { deleteMode } = this.state;
    const { categoryId, groupId } = this.props;
    return (
      <Query query={EQUIPMENT_LIST_QUERY} variables={{ categoryId }}>
        {({ loading, data }) => {
          if (loading) {
            return "loading...";
          } else {
            console.log(data);

            const { name: categoryName } = data.getCategoryName;
            const equipmentData = data.getEquipmentList.map(
              (equipment: { id: string; name: string; assets: [] }) => {
                return {
                  equipmentName: equipment.name,
                  assets: equipment.assets.length,
                  id: equipment.id
                };
              }
            );

            return (
              <>
                <ListPageHeader
                  title={`${categoryName} Models`}
                  deleteToggle={this.deleteToggle}
                />
                {deleteMode && (
                  <DeleteCategory
                    groupId={groupId}
                    cancelDelete={this.deleteToggle}
                    categoryId={categoryId}
                    categoryName={categoryName}
                  />
                )}
                {equipmentData.length > 0 ? (
                  <ListView
                    openCreateMode={this.openCreateMode}
                    listData={equipmentData}
                    linkTo="assets"
                  />
                ) : (
                  <CreateFirst
                    name={`${categoryName} model`}
                    onClick={this.openCreateMode}
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
