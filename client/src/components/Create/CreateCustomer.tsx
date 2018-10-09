import * as React from "react";
// import styled from "styled-components";
import { Mutation } from "react-apollo";

// import Input from "../common/Input";
// import Button from "../common/Button";
import Modal from "../common/Modal";
import CreateDialog from "../common/CreateDialog";
// import "./CreateCustomer.css";

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

  onSubmit = (createFunction: ({}) => Promise<any>) => {
    // **********************************
    // PUT THIS IN CREATE DIALOG COMPONENT
    // ********************************
    const { groupId, closeCreateMode } = this.props;
    const variables = { ...this.state, groupId };
    createFunction({ variables }).then(() => closeCreateMode());
  };

  public render() {
    const { closeCreateMode } = this.props;

    let disabled = true;
    for (let value in this.state) {
      disabled = this.state[value].length < 1;
      if (disabled) break;
    }

    // const fieldsDisplay = fields.map((field: string) => {
    //   return (
    //     <Input
    //       key={field}
    //       name={field}
    //       value={this.state[field]}
    //       onChange={this.onChangeHandler}
    //     />
    //   );
    // });

    return (
      <Mutation mutation={this.props.mutation} update={this.props.update}>
        {createCustomer => (
          <>
            <Modal onClick={closeCreateMode} />
            <CreateDialog
              closeCreateMode={closeCreateMode}
              createFunction={() => this.onSubmit(createCustomer)}
              fields={["Name"]}
            />
            {/* <FormContainer>
              <form action="">{fieldsDisplay}</form>
              <Button
                disabled={disabled}
                primary={true}
                onClick={() => this.onSubmit(createCustomer)}
              >
                Create
              </Button>
              <Button warning={true} onClick={closeCreateMode}>
                Cancel
              </Button>
            </FormContainer> */}
          </>
        )}
      </Mutation>
    );
  }
}

// const FormContainer = styled.div`
//   margin-top: 1.5rem;
//   position: fixed;
//   top: 10%;
//   left: 50%;
//   transform: translateX(-50%);
//   border: 1px solid black;
//   border-radius: 9px;
//   background-color: white;
//   padding: 1.5rem;
//   z-index: 10;
// `;
