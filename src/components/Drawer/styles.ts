import styled from 'styled-components/native';
import {Text} from '../../theme/defaultStlyes';
import {DrawerContentScrollView as DrawerContentScrollViewDef} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LogoIcon} from '../Logo/styles';

export const DrawerContentScrollView = styled(DrawerContentScrollViewDef)`
  background-color: ${p => p.theme.colors.background};
`;

export const ItemsContainer = styled.View`
  margin: 30px 35px;
`;

export const LogoTitle = styled(Text)`
  font-size: 30px;
  margin-bottom: 10px;
  font-family: ${p => p.theme.fonts.bold};
  margin-right: 15px;
  color: ${p => p.theme.colors.primary};
  text-shadow: 1px 2px 12px rgba(0, 0, 0, 0.76);
`;

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

export const UserContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 10px;
  flex-direction: row;
  width: 60%;
  margin-left: 30px;
`;

export const TextContainer = styled.View`
  margin-left: 10px;
  justify-content: space-around;
`;

export const UserName = styled(Text)`
  font-size: 18px;
`;
export const UserEmail = styled(Text)`
  font-size: 12px;
  color: ${p => p.theme.colors.placeholder};
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-top: 30px;
  margin-bottom: -10px;
`;

export const LogoMenuIcon = styled(LogoIcon)`
  text-shadow: 1px 2px 12px rgba(0, 0, 0, 0.76);
  font-size: 100px;
`;

export const LogoMenuContainer = styled(LogoContainer)`
  flex-direction: column;
  margin: 10px 0 -5px;
`;

export const LogoMenuTitle = styled(LogoTitle)`
  font-size: 25px;
  font-family: ${p => p.theme.fonts.bold};
`;
