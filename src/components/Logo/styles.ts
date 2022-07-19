import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {Text} from '../../theme/defaultStlyes';

export const LogoIcon = styled(Icon)`
  padding-bottom: 15px;
  text-shadow: 1px 2px 12px rgba(0, 0, 0, 0.76);
  color: ${p => p.theme.colors.primary};
  font-size: 70px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LogoTitle = styled(Text)`
  font-size: 30px;
  margin-bottom: 10px;
  font-family: ${p => p.theme.fonts.bold};
  margin-right: 15px;
  color: ${p => p.theme.colors.primary};
  text-shadow: 1px 2px 12px rgba(0, 0, 0, 0.76);
`;
