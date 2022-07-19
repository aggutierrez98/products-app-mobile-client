import styled from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
`;
