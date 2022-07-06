import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {useQuery} from '@apollo/client';
import {LoadingScreen} from '../screens/LoadingScreen';
import DrawerNavigator from './DrawerNavigator';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const {
    data: userData,
    loading,
    refetch,
    error,
    client,
  } = useQuery(CURRENT_USER);
  const user = (userData as CurrentUserResponse)?.currentUser;

  client.onClearStore(refetch);

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      {!user || error ? (
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
