import * as React from "react";
import { navigate } from "@reach/router";

import Modal from "../common/Modal";
import "./NewCustomer.css";

export interface NewCustomerProps {
  path: string;
  groupId: string;
}

export default class NewCustomer extends React.Component<
  NewCustomerProps,
  any
> {
  public static defaultProps: Partial<NewCustomerProps> = {
    groupId: ""
  };

  cancel = () => {
    navigate("../");
  };

  public render() {
    return (
      <>
        <Modal />
        <div className="new-form">
          <form action="">
            <label htmlFor="customer">{this.props.groupId}</label>
            <br />
            <input name="customer" type="text" />
          </form>
          <button>submit</button>
          <button onClick={this.cancel}>cancel</button>
        </div>
      </>
    );
  }
}
