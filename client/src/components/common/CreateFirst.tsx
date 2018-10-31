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
      <h4>No {name} data available.</h4>
      <Button primary onClick={onClick}>
        Add your first {name}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  width: 75%;
  max-width: 400px;

  @media (min-width: ${cssVar.FULLSCREEN}px) {
    justify-content: flex-start;
    padding-left: 1em;
  }
`;

// const Text = styled.h4`

// `
