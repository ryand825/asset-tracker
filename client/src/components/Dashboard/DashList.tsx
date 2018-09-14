import * as React from "react";

import "./DashList.css";

export interface DashListProps {
  listData: [any];
}

export default class DashList extends React.Component<DashListProps, any> {
  public render() {
    const dataArray = [...this.props.listData];

    let parentType = "";
    switch (dataArray[0].__typename) {
      case "Location":
        parentType = "customer";
        break;
      case "Asset":
        parentType = "equipment";
        break;
    }

    const dataHeader = dataArray[0].__typename + "s";

    const list = dataArray.map((data, key) => {
      const updated = new Date(data.updatedAt);
      const dateString = `${updated.getMonth() +
        1}/${updated.getDate()}/${updated
        .getFullYear()
        .toString()
        .slice(2)}`;

      return (
        <div key={data.id} className="list-item">
          <div>
            {data.name || `S#: ${data.serial}`}
            <small>{parentType && ` - ${data[parentType].name}`}</small>
          </div>{" "}
          <div>{dateString}</div>{" "}
        </div>
      );
    });

    return (
      <div className="dash-list-container">
        <h4 className="list-header">{dataHeader}</h4>
        {list}
      </div>
    );
  }
}
