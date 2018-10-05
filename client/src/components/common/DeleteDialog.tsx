import * as React from "react";
import { navigate } from "@reach/router";

import Input from "./Input";
import Button from "./Button";
import "./delete.css";

export interface DeleteDialogProps {
  deleteFunction: () => Promise<any>;
  cancelFunction: () => void;
  deleteName: string;
  redirectTo: string;
}

export default class DeleteDialog extends React.Component<
  DeleteDialogProps,
  any
> {
  state = { input: "", nameMatch: false };

  handleInput = (e: any) => {
    const { value } = e.target;
    const nameMatch = value === this.props.deleteName;

    this.setState({
      input: e.target.value,
      nameMatch
    });
  };

  handleDelete = () => {
    const { deleteFunction, redirectTo } = this.props;
    deleteFunction().then(() => navigate(redirectTo));
  };

  public render() {
    const { cancelFunction, deleteName: name } = this.props;

    return (
      <div className="delete-container">
        <div className="delete-message">
          Are you sure you want to delete{" "}
          <span className="delete-name">{name}</span>?
        </div>
        <Input value={this.state.input} onChange={this.handleInput} />
        <small className="delete-small">
          Retype name to confirm delete. <br />
          This can not be undone. <br />
          (Case-Sensitive)
        </small>
        <span>
          <Button
            warning
            disabled={!this.state.nameMatch}
            onClick={this.handleDelete}
          >
            DELETE
          </Button>
          <Button onClick={cancelFunction}>Cancel</Button>
        </span>
      </div>
    );
  }
}
