import * as React from "react";
import styled from "styled-components";
// import { navigate } from "@reach/router";

import Input from "../common/Input";
import Button from "../common/Button";
import Modal from "../common/Modal";
import "./NewCustomer.css";

export interface NewCustomerProps {
  path: string;
  groupId: string;
  closeCreateMode: () => void;
  inId: string;
  fields: [string];
}

export default class NewCustomer extends React.Component<
  NewCustomerProps,
  any
> {
  public static defaultProps: Partial<NewCustomerProps> = {
    groupId: ""
  };

  state = {};

  onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    let formState = { ...this.state };
    formState[name] = value;

    this.setState({
      ...formState
    });
  };

  public render() {
    const { closeCreateMode, fields } = this.props;

    const fieldsDisplay = fields.map((field: string) => {
      return (
        <Input
          key={field}
          name={field}
          value={this.state[field]}
          onChange={this.onChangeHandler}
        />
      );
    });

    return (
      <>
        <Modal onClick={closeCreateMode} />
        <FormContainer>
          <form action="">{fieldsDisplay}</form>
          <Button>Create</Button>
          <Button onClick={closeCreateMode}>Cancel</Button>
        </FormContainer>
      </>
    );
  }
}

const FormContainer = styled.div`
  margin-top: 1.5rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  border-radius: 9px;
  background-color: white;
  padding: 1.5rem;
  z-index: 10;
`;
