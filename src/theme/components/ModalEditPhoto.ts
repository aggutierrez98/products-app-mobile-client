import styled from 'styled-components/native';
import {ButtonSave} from '../defaultStlyes';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.theme.colors.background};
  border-radius: 10px;
  padding: 20px;
`;

export const ModalButton = styled(ButtonSave)`
  width: 100px;
`;
