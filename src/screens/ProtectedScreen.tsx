/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */
import {useApolloClient, useQuery} from '@apollo/client';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ExpireStorage from '../helpers/saveDataToStorage';
import {GET_USER} from '../graphql/queries';

export const ProtectedScreen = () => {
  const client = useApolloClient();
  const {data: userData} = useQuery(GET_USER);

  const logout = async () => {
    await ExpireStorage.removeItem('x-token');
    await client.clearStore();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <Button title="Logout" color="#5856d6" onPress={logout} />

      <Text style={{color: 'black'}}>
        {JSON.stringify(userData?.getUser, null, 5)}
      </Text>
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
