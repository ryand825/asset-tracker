import * as React from "react";
import styled from "styled-components";

import Button from "./Button";
import cssVar from "../../variables";

export interface ListPageHeaderProps {
  title: string;
  titleAffix?: string;
  subTitle?: string;
  deleteToggle: () => void;
}

export default class ListPageHeader extends React.Component<
  ListPageHeaderProps,
  any
> {
  public render() {
    const { title, subTitle, deleteToggle, titleAffix } = this.props;
    return (
      <>
        <Header>
          <h3>
            {title} <small>{titleAffix && `- ${titleAffix}`}</small>
          </h3>

          <Button warning onClick={deleteToggle}>
            Delete
          </Button>
        </Header>
        <SubHeader>{subTitle}</SubHeader>
      </>
    );
  }
}

const Header = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1em;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    justify-content: flex-start;

    & h3 {
      margin-right: 2em;
    }
  }
`;

const SubHeader = styled.h4`
  margin: 0.4em 1.5em;
`;
