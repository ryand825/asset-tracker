import * as React from "react";

export interface PaginationProps {
  pages: number;
}

export default class Pagination extends React.Component<PaginationProps, any> {
  public render() {
    return (
      <div className="pagination">
        <button>{"<<"}</button>
        <button>{">>"}</button>
      </div>
    );
  }
}
