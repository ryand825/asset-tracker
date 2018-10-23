import * as React from "react";
import { Mutation, Query } from "react-apollo";

import { GET_GROUP_ID } from "../../gql/group";
import Modal from "../common/Modal";
import CreateDialog from "./CreateDialog";

export interface CreateCustomerProps {
  closeCreateMode: () => void;
  fields: string[]; // defines the state object
  mutation: any;
  update: any;
  variables?: {};
}

export default class CreateCustomer extends React.Component<
  CreateCustomerProps,
  any
> {
  // Initiates object for initial state
  // State is created based on the 'fields' prop
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
    const { closeCreateMode, fields, variables } = this.props;

    let disabled = true;
    for (let value in this.state) {
      disabled = this.state[value].length < 1;
      if (disabled) break;
    }

    return (
      <Query query={GET_GROUP_ID}>
        {({ data }) => {
          const { defaultGroupId: groupId } = data;
          return (
            <Mutation mutation={this.props.mutation} update={this.props.update}>
              {createFunction => (
                <>
                  <Modal onClick={closeCreateMode} />
                  <CreateDialog
                    optionalVariables={variables}
                    closeCreateMode={closeCreateMode}
                    createFunction={createFunction}
                    fields={fields}
                    groupId={groupId}
                  />
                </>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
