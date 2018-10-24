import * as React from "react";
import styled from "styled-components";

interface IButtonProps {
  onClick?: () => void;
  primary?: boolean;
  warning?: boolean;
  disabled?: boolean;
}

const Button: React.SFC<IButtonProps> = props => {
  let color = "";
  const disabled = props.disabled ? true : false;

  if (disabled) {
    color = "lightgray";
  } else if (props.primary) {
    color = "rgba(173,255,47, 0.4)";
  } else if (props.warning) {
    // color = "rgba(255,69,0, 0.4)";
    color = "rgba(255, 0, 0, 0.6)";
  } else {
    color = "white";
  }

  return (
    <StyledButton disabled={disabled} color={color} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled<{ color: string; disabled: boolean }, "button">(
  "button"
)`
  color: black;
  padding: 0.6em 1em;
  margin-right: 1em;
  background-color: ${props => props.color};
  border: 0.5px solid lightgray;
  box-shadow: ${props =>
    props.disabled
      ? "0px 0px 3px rgba(0, 0, 0, 0.5) inset"
      : "0px 0px 3px rgba(0, 0, 0, 0.5)"};

  &:disabled {
    color: gray;
  }

  &:hover:not([disabled]) {
    cursor: pointer;
    background-color: white;
    box-shadow: ${props =>
      `0px 0px 6px 1px ${props.color === "white" ? "gray" : props.color}`};
    // color: ${props => (props.color === "white" ? "gray" : props.color)};
    color: black;
  }
`;
