import * as React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Button from "../common/Button";
import Input from "../common/Input";

export interface CreateDialogProps {
  fields: string[];
  createFunction: ({}) => Promise<any>;
  closeCreateMode: () => void;
  optionalVariables?: {};
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

  onSubmit = (createFunction: ({}) => Promise<any>, groupId: string) => {
    const { closeCreateMode, optionalVariables } = this.props;
    const variables = { ...this.state, groupId, ...optionalVariables };
    createFunction({ variables }).then(() => closeCreateMode());
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
      <Query query={GROUP_ID}>
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else {
            const { defaultGroupId: groupId } = data;
            return (
              <FormContainer>
                <form action="">{fieldsDisplay}</form>
                <Button
                  disabled={disabled}
                  primary={true}
                  onClick={() => this.onSubmit(createFunction, groupId)}
                >
                  Create
                </Button>
                <Button warning={true} onClick={closeCreateMode}>
                  Cancel
                </Button>
              </FormContainer>
            );
          }
        }}
      </Query>
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

const GROUP_ID = gql`
  query {
    defaultGroupId @client
  }
`;
