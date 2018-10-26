import * as React from "react";
import { Query } from "react-apollo";

import { EQUIPMENT_LIST_QUERY } from "../../gql/equipment";
import ListView from "../common/ListView";

export interface EquipmentListProps {
  categoryId?: string;
  path: string;
}

export default class EquipmentList extends React.Component<
  EquipmentListProps,
  any
> {
  state = { isCreateMode: false };

  openCreateMode = () => {
    this.setState({ isCreateMode: true });
  };

  closeCreateMode = () => {
    this.setState({ isCreateMode: false });
  };
  public render() {
    // const { isCreateMode } = this.state;
    const { categoryId } = this.props;
    return (
      <Query query={EQUIPMENT_LIST_QUERY} variables={{ categoryId }}>
        {({ loading, data }) => {
          if (loading) {
            return "loading...";
          } else {
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
                <ListView
                  openCreateMode={this.openCreateMode}
                  listData={equipmentData}
                  linkTo="assets"
                />
                {/* {isCreateMode && (
                  <CreateCustomer
                    groupId={groupId}
                    updateQuery={CUSTOMER_QUERY}
                    closeCreateMode={this.closeCreateMode}
                  />
                )} */}
              </>
            );
          }
        }}
      </Query>
    );
  }
}
