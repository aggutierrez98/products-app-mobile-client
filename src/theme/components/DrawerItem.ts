import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {Text} from '../defaultStlyes';

export const ItemButton = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
  padding: 2px;
`;

export const ItemIcon = styled(Icon)`
  margin-right: 10px;
  font-size: 30px;
  color: ${p => p.theme.colors.primary};
`;
export const ItemText = styled(Text)`
  font-size: 20px;
  font-family: ${p => p.theme.fonts.regular};
`;
