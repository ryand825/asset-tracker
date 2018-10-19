import * as React from "react";
import styled from "styled-components";

export interface InputProps {
  name?: string;
  value: string;
  onChange: (e: any) => void;
}

export default class Input extends React.Component<InputProps, any> {
  public render() {
    const { name, value, onChange } = this.props;
    const label = name && name.charAt(0).toUpperCase() + name.substr(1);
    return (
      <>
        {name && <Label htmlFor={name}>{label}</Label>}
        <InputBox onChange={onChange} name={name} value={value} type="text" />
      </>
    );
  }
}

const Label = styled.label`
  display: block;
`;

const InputBox = styled.input`
  background-color: rgba(120, 120, 120, 0.1);
  border: 1px solid lightgray;
  border-radius: 9px;
  padding: 0.5em;
  margin-bottom: 0.5em;
`;
