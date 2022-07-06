import {QueryResult, useQuery} from '@apollo/client';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';
import {componentStyles} from '../components/styles';
import {DEFAULT_IMAGE} from './UserScreen';

export const ProfileScreen = () => {
  const {data: userData}: QueryResult<CurrentUserResponse> =
    useQuery(CURRENT_USER);
  const user = userData?.currentUser;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={componentStyles.avatarContainer}>
          <Image
            source={{
              uri: user?.image || DEFAULT_IMAGE,
            }}
            style={componentStyles.avatarInProtected}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
          }}>
          EMAIL:
        </Text>
        <Text style={{color: 'black', fontSize: 15}}>{user?.email}</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
          }}>
          NAME:
        </Text>
        <Text style={{color: 'black'}}>{user?.name}</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
          }}>
          ROLE:
        </Text>
        <Text style={{color: 'black'}}>{user?.role.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
});
