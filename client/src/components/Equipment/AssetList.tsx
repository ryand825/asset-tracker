import * as React from "react";
import { Query } from "react-apollo";

import { GET_ASSET_LIST_BY_EQUIPMENT_ID } from "../../gql/equipment";
import CreateFirst from "../common/CreateFirst";
import ListPageHeader from "../common/ListPageHeader";
import ListView from "../common/ListView";
import DeleteCategory from "../Delete/DeleteCategory";

export interface AssetListProps {
  equipmentId: string;
  path: string;
  groupId: string;
}

export default class AssetList extends React.Component<AssetListProps, any> {
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
    const { equipmentId, groupId } = this.props;
    return (
      <Query query={GET_ASSET_LIST_BY_EQUIPMENT_ID} variables={{ equipmentId }}>
        {({ loading, data }) => {
          if (loading) {
            return "loading...";
          } else {
            console.log(data);

            const {
              name: equipmentName
            } = data.getAssetsByEquipmentId[0].equipment;
            const equipmentData = data.getAssetsByEquipmentId.map(
              (asset: {
                id: string;
                serial: string;
                location: { name: string };
              }) => {
                return {
                  serial: asset.serial,
                  location: asset.location.name,
                  id: asset.id
                };
              }
            );

            return (
              <>
                <ListPageHeader
                  title={`${equipmentName} Models`}
                  deleteToggle={this.deleteToggle}
                />
                {deleteMode && (
                  <DeleteCategory
                    groupId={groupId}
                    cancelDelete={this.deleteToggle}
                    categoryId={equipmentId}
                    categoryName={equipmentName}
                  />
                )}
                {equipmentData.length > 0 ? (
                  <ListView
                    openCreateMode={this.openCreateMode}
                    listData={equipmentData}
                    linkTo="asset"
                  />
                ) : (
                  <CreateFirst
                    name={`${equipmentName} model`}
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
