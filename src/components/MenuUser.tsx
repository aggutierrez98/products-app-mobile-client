import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {FadeInImage} from './FadeInImage';
import {
  UserContainer,
  TextContainer,
  UserName,
  UserEmail,
} from '../theme/components/MenuUser';

export const MenuUser = () => {
  const {user} = useAuth();

  return (
    <UserContainer>
      <FadeInImage
        style={{height: 60, width: 60, borderRadius: 30}}
        source={
          user?.image
            ? {
                uri: user?.image,
              }
            : require('../assets/avatar-placeholder.png')
        }
      />
      <TextContainer>
        <UserName numberOfLines={1}>{user?.name}</UserName>
        <UserEmail numberOfLines={1}>{user?.email}</UserEmail>
      </TextContainer>
    </UserContainer>
  );
};
