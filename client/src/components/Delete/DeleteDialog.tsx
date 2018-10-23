import * as React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

import Input from "../common/Input";
import Button from "../common/Button";
import Modal from "../common/Modal";
import cssVar from "../../variables";

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
      <>
        <Modal onClick={cancelFunction} />
        <DeleteContainer>
          <div className="delete-message">
            Are you sure you want to delete <DeleteName>{name}</DeleteName>?
          </div>
          <Input value={this.state.input} onChange={this.handleInput} />
          <DeleteSmall>
            Retype name to confirm delete. <br />
            This can not be undone. <br />
            (Case-Sensitive)
          </DeleteSmall>
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
        </DeleteContainer>
      </>
    );
  }
}

const DeleteContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  border-radius: 9px;
  background-color: white;
  padding: 1.5rem;
  z-index: 10;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
     {
      width: auto;
    }
  }
`;
const DeleteName = styled.span`
  color: red;
`;

const DeleteSmall = styled.small`
  font-size: 0.8em;
  color: red;
  margin-bottom: 1em;
`;

/* @media screen and (min-width: 600px) {
  .delete-container {
    width: auto;
  }
} */
