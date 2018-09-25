import * as React from "react";
import styled from "styled-components";

interface IButtonProps {
  onClick?: () => void;
  primary?: boolean;
  warning?: boolean;
}

const Button: React.SFC<IButtonProps> = props => {
  let color = "";
  if (props.primary) {
    color = "green";
  } else if (props.warning) {
    color = "red";
  } else {
    color = "white";
  }

  return (
    <StyledButton color={color} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  padding: 0.6em 1em;
  margin-right: 1em;
  background-color: white;
  border: 0.5px solid lightgray;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);

  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;
