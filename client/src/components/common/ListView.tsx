import * as React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import cssVar from "../../variables";

export interface ListViewProps {
  //Use "id" as the last key in each object in the list
  //Edit/View buttons will be generated from this
  listData: [{}];
  linkTo: string; // Route for the 'Link' button
  linkFrom: string;
}

export default class ListView extends React.Component<ListViewProps, any> {
  public static defaultProps: Partial<ListViewProps> = {
    linkFrom: ""
  };

  public render() {
    const { listData, linkTo, linkFrom } = this.props;
    const labels = Object.keys(listData[0]);

    const isId = labels.indexOf("id"); //Throw error if "id" not at the end
    if (isId >= 0) {
      if (labels[isId] !== labels[labels.length - 1]) {
        throw new Error(`"id" must be the last key for each object`);
      } else {
        labels[isId] = "";
      }
    }

    const columns = labels.length;

    // Formats camel case and creates an array of column headers
    const headerRow = labels.map((label, key) => {
      if (label) {
        const labelString = label
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, function(str) {
            return str.toUpperCase();
          });
        return <ColumnHeader key={key}>{labelString}</ColumnHeader>;
      } else {
        return (
          <ColumnHeader key={key}>
            <Link to={`/create/${linkTo}/${linkFrom}`}>+</Link>
          </ColumnHeader>
        );
      }
    });

    // Creates the row data
    const contentRows = listData.map((data: any, key) => {
      const evenOdd = key % 2 === 0 ? "odd" : "even";
      let row = [];
      for (let item in data) {
        if (item === "id") {
          row.push(
            // Displays buttons for the ID column
            <div key={item} className={`row-data ${evenOdd}`}>
              <Link to={`/${linkTo}/${data.id}`}>View</Link>
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
    margin: 20px 20px 0 0;
    justify-content: start;
  }
`};
`;

const ColumnHeader = styled.div`
  padding-top: 10px;
  align-self: stretch;
  color: white;
  background-color: ${cssVar.SECONDARY_COLOR};

  & a {
    color: black;
    display: inline-block;
    background-color: ${cssVar.PRIMARY_LIGHT};
    border: none;
    width: 60px;
    font-size: 1.5em;
    margin-top: -5px;
    cursor: pointer;
  }

  & a:hover {
    border-radius: 2px;
    background-color: ${cssVar.SECONDARY_LIGHT};
    color: white;
    box-shadow: 0px 0px 6px 2px rgba(255, 255, 255, 0.5);
  }
`;
