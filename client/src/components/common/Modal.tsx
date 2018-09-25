import * as React from "react";
import styled from "styled-components";

interface ModalProps {
  onClick?: () => void;
}

const Modal: React.SFC<ModalProps> = props => {
  return <ScreenCover onClick={props.onClick} />;
};

const ScreenCover = styled.div`
  background-color: black;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
`;

export default Modal;
