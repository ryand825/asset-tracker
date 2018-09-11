import * as React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import Hamburger from "../common/Hamburger";
import Modal from "../common/Modal";

// import { Query } from "react-apollo";
// import gql from "graphql-tag";

import cssVar from "../../variables";

export interface NavBarProps {
  groups: [{ id: String; name: String }];
}

export default class NavBar extends React.Component<NavBarProps, any> {
  state = {
    menuOpen: false
  };

  menuToggle = () => {
    this.setState((prevState: { menuOpen: boolean }) => {
      return { menuOpen: !prevState.menuOpen };
    });
  };

  public render() {
    const { menuOpen } = this.state;

    return (
      <React.Fragment>
        <Header>
          <Hamburger open={menuOpen} onClick={this.menuToggle} />
        </Header>
        {menuOpen && <Modal onClick={this.menuToggle} />}
        <SideNav menuOpen={menuOpen}>
          <GroupSelect>{this.props.groups[0].name} ...</GroupSelect>
          <NavList>
            <Link className="menu-item" to="/">
              Dashboard
            </Link>
            <Link className="menu-item" to="/equipment">
              Equipment
            </Link>
            <Link className="menu-item" to="/customers">
              Customers
            </Link>
            <Link className="menu-item" to="/">
              Procedures
            </Link>
          </NavList>
        </SideNav>
      </React.Fragment>
    );
  }
}

const Header = styled.header`
  background-color: ${cssVar.PRIMARY_COLOR};
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    & i {
      display: none;
  }
`;

const SideNav = styled<{ menuOpen: boolean }, "aside">("aside")`
  font-size: 20px;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${cssVar.SECONDARY_COLOR};
  height: 100%;
  width: 220px;
  transition: 0.1s;
  transform: ${props =>
    props.menuOpen ? `translateX(0)` : `translateX(-100%)`};

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    transform: translateX(0);
  }
`;

const GroupSelect = styled.div`
  background-color: ${cssVar.PRIMARY_LIGHT};
  height: 40px;
  width: 220px;
  padding-top: 10px;
  padding-left: 5px;
  border-bottom: 1px solid ${cssVar.PRIMARY_DARK};
`;

const NavList = styled.ul`
  color: #eee;
  display: flex;
  flex-direction: column;

  & .menu-item {
    padding: 8px 0 8px 4px;
    border-bottom: 1px solid gray;
  }

  & .menu-item:hover {
    background: #555;
  }
`;
