import React from 'react';
import {
  LogoMenuContainer,
  LogoMenuTitle,
  LogoMenuIcon,
  LogoContainer,
} from './styles';

export const LogoMenu = () => {
  return (
    <LogoContainer>
      <LogoMenuContainer>
        <LogoMenuTitle>PRODUCTS APP</LogoMenuTitle>
        <LogoMenuIcon name="card-giftcard" />
      </LogoMenuContainer>
    </LogoContainer>
  );
};
