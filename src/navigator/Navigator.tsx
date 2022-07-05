/* eslint-disable curly */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {useApolloClient, useQuery} from '@apollo/client';
import {GET_USER} from '../graphql/queries';
import {LoadingScreen} from '../screens/LoadingScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const client = useApolloClient();
  const {loading, data, error, refetch} = useQuery(GET_USER, {
    fetchPolicy: 'cache-first',
  });

  client.onClearStore(async () => {
    refetch();
  });

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      {!data || error ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
};
