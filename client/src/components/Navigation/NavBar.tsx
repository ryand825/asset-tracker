import * as React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

// import { Query } from "react-apollo";
// import gql from "graphql-tag";

import cssVar from "../../variables";

export interface NavBarProps {
  groups: [{ id: String; name: String }];
}

export default class NavBar extends React.Component<NavBarProps, any> {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <SideNav>
          <GroupSelect>{this.props.groups[0].name} ...</GroupSelect>
          <NavList>
            <Link className="menu-item" to="/dashboard">
              Dashboard
            </Link>
            <Link className="menu-item" to="/equipment">
              Equipment
            </Link>
            <Link className="menu-item" to="/">
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
  /* box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5); */
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const SideNav = styled.div`
  font-size: 20px;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${cssVar.SECONDARY_COLOR};
  height: 100%;
  width: 220px;
  /* border-right: 1px solid ${cssVar.SECONDARY_LIGHT}; */
  /* box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5); */
`;

const GroupSelect = styled.div`
  background-color: ${cssVar.PRIMARY_LIGHT};
  /* position: fixed; */
  /* top: 40px; */
  height: 40px;
  width: 220px;  
  padding-top: 10px;
  padding-left: 5px;
  /* box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5); */
  border-bottom: 1px solid ${cssVar.PRIMARY_DARK};
  /* border-top: 0.5px solid ${cssVar.PRIMARY_DARK}; */
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
