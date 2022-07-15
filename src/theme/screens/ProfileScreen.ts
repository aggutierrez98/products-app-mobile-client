import styled from 'styled-components/native';
import {Text} from '../defaultStlyes';

export const ProfileContainer = styled.View`
  margin-top: 10%;
  align-items: center;
  flex: 1;
`;

export const AvatarContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 17px;
  margin-bottom: 20px;
`;

export const Label = styled(Text)`
  font-size: 20px;
  font-family: ${p => p.theme.fonts.boldItalic};
  margin-top: 15px;
  color: ${p => p.theme.colors.primary};
`;
