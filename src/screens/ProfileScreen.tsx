import {QueryResult, useQuery} from '@apollo/client';
import React from 'react';
import {ScrollView} from 'react-native';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';
import {FadeInImage} from '../components/FadeInImage';
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';
import {
  Label,
  AvatarContainer,
  ProfileContainer,
  Title,
} from '../theme/profileScreenStyles';

export const ProfileScreen = () => {
  const {data: userData, error}: QueryResult<CurrentUserResponse> =
    useQuery(CURRENT_USER);
  const user = userData?.currentUser;
  useShowErrorMessages(error);

  return (
    <ScrollView>
      <ProfileContainer>
        <AvatarContainer>
          <FadeInImage
            source={
              user?.image
                ? {
                    uri: user?.image,
                  }
                : require('../assets/avatar-placeholder.png')
            }
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
            }}
          />
        </AvatarContainer>
        <Label>Email:</Label>
        <Title>{user?.email}</Title>
        <Label>Name:</Label>
        <Title>{user?.name}</Title>
        <Label>Role:</Label>
        <Title>{user?.role.name}</Title>
      </ProfileContainer>
    </ScrollView>
  );
};
