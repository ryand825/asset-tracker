import * as React from "react";
import styled from "styled-components";

import Button from "./Button";
import Input from "./Input";

export interface CreateDialogProps {
  fields: string[];
  createFunction: () => void;
  closeCreateMode: () => void;
}

export default class CreateDialog extends React.Component<
  CreateDialogProps,
  any
> {
  private fields = this.props.fields.reduce((obj, value) => {
    obj[value] = "";
    return obj;
  }, {});

  state = { ...this.fields };

  onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    let formState = { ...this.state };
    formState[name] = value;

    this.setState({
      ...formState
    });
  };
  public render() {
    const { fields, createFunction, closeCreateMode } = this.props;

    let disabled = true;
    for (let value in this.state) {
      disabled = this.state[value].length < 1;
      if (disabled) break;
    }

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
      <FormContainer>
        <form action="">{fieldsDisplay}</form>
        <Button disabled={disabled} primary={true} onClick={createFunction}>
          Create
        </Button>
        <Button warning={true} onClick={closeCreateMode}>
          Cancel
        </Button>
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
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
`;
