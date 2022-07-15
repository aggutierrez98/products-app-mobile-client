import styled from 'styled-components/native';
import {Text} from '../defaultStlyes';
import {DrawerContentScrollView as DrawerContentScrollViewDef} from '@react-navigation/drawer';

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
