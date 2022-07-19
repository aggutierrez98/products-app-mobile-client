import styled from 'styled-components/native';
import {Text, TextInput} from '../../theme/defaultStlyes';
import IconDef from 'react-native-vector-icons/MaterialIcons';

export const CardContainer = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.View`
  width: 26%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const Name = styled(Text)`
  font-size: 18px;
  margin: 0 10px;
  margin-top: 5px;
  margin-bottom: -5px;
`;

export const Detail = styled(Name)`
  font-size: 14px;
  flex: 1;
  color: ${p => p.theme.colors.placeholder};
`;

export const EditButton = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px;
  background-color: ${p => p.theme.colors.foreground};
`;

export const DeleteButton = styled(EditButton)`
  background-color: #af0303;
`;

export const Icon = styled(IconDef)`
  text-shadow: 1px 2px 12px rgba(0, 0, 0, 0.76);
  color: ${p => p.theme.colors.text};
  font-size: 27.5px;
`;

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
