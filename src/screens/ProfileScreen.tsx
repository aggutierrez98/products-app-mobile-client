import {QueryResult, useQuery} from '@apollo/client';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';
import {componentStyles} from '../components/styles';
import {FadeInImage} from '../components/FadeInImage';
import Text from '../components/CustomText';

export const ProfileScreen = () => {
  const {data: userData}: QueryResult<CurrentUserResponse> =
    useQuery(CURRENT_USER);
  const user = userData?.currentUser;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={componentStyles.avatarContainer}>
          <FadeInImage
            source={
              user?.image
                ? {
                    uri: user?.image,
                  }
                : require('../assets/avatar-placeholder.png')
            }
            style={componentStyles.avatarInProtected}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
            color: '#F66B0E',
          }}>
          EMAIL:
        </Text>
        <Text style={{fontSize: 15}}>{user?.email}</Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
            color: '#F66B0E',
          }}>
          NAME:
        </Text>
        <Text style={{}}>{user?.name}</Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
            color: '#F66B0E',
          }}>
          ROLE:
        </Text>
        <Text style={{}}>{user?.role.name}</Text>
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
  },
});
