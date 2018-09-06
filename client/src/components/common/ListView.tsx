import * as React from "react";
import styled from "styled-components";

export interface ListViewProps {
  listData: [{}];
}

export default class ListView extends React.Component<ListViewProps, any> {
  public render() {
    console.log(this.props.listData);
    const testArray = [...this.props.listData];
    // const testArray = [
    //   { name: "one", description: "hello one", address: "one street" },
    //   { name: "two", description: "hello two", address: "two street" },
    //   { name: "three", description: "hello three", address: "three street" },
    //   { name: "four", description: "hello four", address: "four street" }
    // ];
    const labels = Object.keys(testArray[0]);
    const columns = labels.length;

    const headerRow = labels.map(label => {
      return <div>{label}</div>;
    });

    const contentRows = testArray.map(data => {
      let row = [];
      for (let key in data) {
        row.push(<div>{data[key]}</div>);
      }
      return row;
    });
    console.log(contentRows);

    return (
      <Grid columns={columns}>
        {headerRow}
        {contentRows}
      </Grid>
    );
  }
}

const Grid = styled<{ columns: number }, "div">("div")`
  border: 1px solid black;
  margin: 60px 30px 0 30px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
`;
