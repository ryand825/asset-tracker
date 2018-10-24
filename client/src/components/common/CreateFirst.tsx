import * as React from "react";
import styled from "styled-components";

import cssVar from "../../variables";
import Button from "./Button";

export interface CreateFirstProps {
  name: string;
  onClick: () => void;
}

export default function CreateFirst(props: CreateFirstProps) {
  const { onClick, name } = props;

  return (
    <Container>
      <Button primary onClick={onClick}>
        Create your first {name}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    justify-content: flex-start;
    padding-left: 1em;
  }
`;
