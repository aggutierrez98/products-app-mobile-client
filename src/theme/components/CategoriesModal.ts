import styled from 'styled-components/native';
import {Text, TextInput} from '../defaultStlyes';

export const ModalTitle = styled(Text)`
  font-size: 18px;
  margin-bottom: 10px;
  font-family: ${p => p.theme.fonts.bold};
`;

export const ModalContentContainer = styled.View`
  background-color: ${p => p.theme.colors.background};
  justify-content: center;
  align-items: center;
  width: 250px;
  border-radius: 10px;
  padding: 12px;
`;

export const ModalInput = styled(TextInput)`
  width: 80%;
  padding: 5px 20px;
  margin-top: 5px;
  margin-bottom: 20px;
`;
