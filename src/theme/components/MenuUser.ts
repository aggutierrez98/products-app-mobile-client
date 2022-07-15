import styled from 'styled-components/native';
import {Text} from '../defaultStlyes';

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
