import * as React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import cssVar from "../../variables";

export interface NavBarProps {}

export default class NavBar extends React.Component<NavBarProps, any> {
  public render() {
    return (
      <React.Fragment>
        <Header>
          <SideNav>
            <GroupSelect>Main Group</GroupSelect>
            <NavList>
              <NavItem>
                <Link to="/">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Equipment</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Customers</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Procedures</Link>
              </NavItem>
            </NavList>
          </SideNav>
        </Header>
      </React.Fragment>
    );
  }
}

const Header = styled.header`
  background-color: ${cssVar.PRIMARY_COLOR};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

const GroupSelect = styled.div`
  background-color: ${cssVar.PRIMARY_LIGHT};
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding-top: 10px;
  padding-left: 5px;
  /* box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5); */
  border-bottom: 1px solid ${cssVar.PRIMARY_DARK};
  /* border-top: 0.5px solid ${cssVar.PRIMARY_DARK}; */
`;

const SideNav = styled.div`
  background-color: ${cssVar.SECONDARY_COLOR};
  height: 100vh;
  width: 220px;
  margin-top: 40px;
  margin-bottom: 60px;
  border-right: 1px solid ${cssVar.SECONDARY_LIGHT};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
`;

const NavList = styled.ul`
  color: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const NavItem = styled.li`
  font-size: 20px;
  padding: 8px 0 8px 4px;
  border-bottom: 1px solid gray;

  &:hover {
    background: #555;
  }
`;
