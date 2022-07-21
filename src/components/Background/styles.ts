import styled from 'styled-components/native';

export const BackgroundContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${p => p.theme.colors.text};
`;

interface BoxProps {
  routeName: string;
}

export const BackgroundBox = styled.View<BoxProps>`
  position: absolute;
  z-index: -1;
  background-color: ${p => p.theme.colors.background};
  top: ${p => (p.routeName === 'LoginScreen' ? '-150px' : '-120px')};
  width: ${p => (p.routeName === 'LoginScreen' ? '550px' : '625px')};
  height: 1200px;
  transform: rotate(-50deg);
`;
