import * as React from "react";
// import styled from "styled-components";

import "./input.css";

export interface InputProps {
  name: string;
  value: string;
  onChange: (e: any) => void;
}

export default class Input extends React.Component<InputProps, any> {
  public render() {
    const { name, value, onChange } = this.props;
    return (
      <>
        <label htmlFor={name}>{name}</label>
        <input onChange={onChange} name={name} value={value} type="text" />
      </>
    );
  }
}

// const Label = styled.label`
//   color: green;
// `;
