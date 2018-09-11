import * as React from "react";
import styled from "styled-components";
import cssVar from "../../variables";

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

const Hamburger: React.SFC<HamburgerProps> = props => {
  return (
    <Menu aria-label="Menu Button" open={props.open} onClick={props.onClick}>
      <div aria-hidden="true" className="bar1" />
      <div aria-hidden="true" className="bar2" />
      <div aria-hidden="true" className="bar3" />
    </Menu>
  );
};

const Menu = styled<{ open: boolean }, "i">("i")`
  padding-left: 6px;
  display: inline-block;
  cursor: pointer;

  & .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: ${cssVar.SECONDARY_COLOR};
    margin: 6px 0;
    transition: 0.1s;
  }

  ${props =>
    props.open &&
    `
  & .bar1 {
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  & .bar2 {
    opacity: 0;
  }

  & .bar3 {
    transform: rotate(45deg) translate(-8px, -8px);
  }`};
`;

export default Hamburger;
