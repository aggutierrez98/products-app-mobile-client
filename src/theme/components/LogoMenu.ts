import styled from 'styled-components/native';
import {LogoTitle, LogoIcon} from './Logo';

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
