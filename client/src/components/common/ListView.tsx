import * as React from "react";
import styled from "styled-components";

import cssVar from "../../variables";

export interface ListViewProps {
  //Use "id" as the last key in each object in the list
  //Edit/View buttons will be generated from this
  listData: [{}];
}

export default class ListView extends React.Component<ListViewProps, any> {
  public render() {
    const dataArray = [...this.props.listData];
    const labels = Object.keys(dataArray[0]);

    const isId = labels.indexOf("id"); //Throw error if "id" not at the end
    if (isId >= 0) {
      if (labels[isId] !== labels[labels.length - 1]) {
        throw new Error(`"id" must be the last key for each object`);
      } else {
        labels[isId] = " ";
      }
    }

    const columns = labels.length;

    // Formats camel case and creates an array of column headers
    const headerRow = labels.map((label, key) => {
      const labelString = label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function(str) {
          return str.toUpperCase();
        });
      return <ColumnHeader key={key}>{labelString}</ColumnHeader>;
    });

    // Creates the row data
    const contentRows = dataArray.map((data, key) => {
      const evenOdd = key % 2 === 0 ? "odd" : "even";
      console.log(evenOdd);
      let row = [];
      for (let item in data) {
        if (item === "id") {
          row.push(
            // Displays buttons for the ID column

            <div key={item} className={`row-data ${evenOdd}`}>
              <button>View</button>
            </div>
          );
        } else {
          row.push(
            <div key={item} className={`row-data ${evenOdd}`}>
              {data[item]}
            </div>
          );
        }
      }
      return row;
    });

    return (
      <Grid columns={columns}>
        {headerRow}
        {contentRows}
      </Grid>
    );
  }
}

const Grid = styled<{ columns: number }, "div">("div")`
  ${props => `
  display: grid;
  justify-content: stretch;
  grid-template-columns: repeat(${props.columns}, auto);
  grid-template-rows: 40px;
  text-align: center;

  & .row-data {
    padding: 5px 10px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  & .even {
    background-color: lightgray;
  }

  @media (max-width: ${cssVar.FULLSCREEN - 1}px) {
    & div:nth-child(${props.columns}n) {
      border-right: 0px;
    }
  }

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    border-left: 1px solid black;
    margin: 60px 20px 0 20px;
    justify-content: start;
  }
`};
`;

const ColumnHeader = styled.div`
  padding-top: 10px;
  align-self: stretch;
  color: white;
  background-color: ${cssVar.SECONDARY_COLOR};
`;
