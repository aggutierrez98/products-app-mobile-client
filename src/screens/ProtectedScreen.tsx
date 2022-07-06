import {QueryResult, useApolloClient, useQuery} from '@apollo/client';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ExpireStorage from '../helpers/saveDataToStorage';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';

export const ProtectedScreen = () => {
  const client = useApolloClient();
  const {data: userData}: QueryResult<CurrentUserResponse> =
    useQuery(CURRENT_USER);
  const user = userData?.currentUser;

  const logout = async () => {
    await ExpireStorage.removeItem('x-token');
    await client.clearStore();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <Button title="Logout" color="#5856d6" onPress={logout} />

      <Text style={{color: 'black'}}>{JSON.stringify(user, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
});
