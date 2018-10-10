import * as React from "react";
import { Mutation } from "react-apollo";

import Modal from "../common/Modal";
import CreateDialog from "../common/CreateDialog";

export interface CreateCustomerProps {
  groupId: string;
  closeCreateMode: () => void;
  fields: string[];
  mutation: any;
  update: any;
}

export default class CreateCustomer extends React.Component<
  CreateCustomerProps,
  any
> {
  // Initiates object for initial state
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
    const { closeCreateMode } = this.props;

    let disabled = true;
    for (let value in this.state) {
      disabled = this.state[value].length < 1;
      if (disabled) break;
    }

    return (
      <Mutation mutation={this.props.mutation} update={this.props.update}>
        {createCustomer => (
          <>
            <Modal onClick={closeCreateMode} />
            <CreateDialog
              closeCreateMode={closeCreateMode}
              createFunction={createCustomer}
              fields={["name"]}
            />
          </>
        )}
      </Mutation>
    );
  }
}
