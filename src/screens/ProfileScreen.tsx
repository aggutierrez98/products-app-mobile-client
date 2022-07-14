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
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.title}>{user?.email}</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.title}>{user?.role.name}</Text>
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
    fontSize: 17,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-BoldItalic',
    marginTop: 15,
    color: '#F66B0E',
  },
});
