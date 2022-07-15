import React from 'react';
import {
  LogoMenuContainer,
  LogoMenuTitle,
  LogoMenuIcon,
  LogoContainer,
} from '../theme/components/LogoMenu';

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
