import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {useQuery} from '@apollo/client';
import {LoadingScreen} from '../screens/LoadingScreen';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserResponse} from '../interfaces/user';
import ProtectedNavigator from './ProtectedNavigator';

const Stack = createNativeStackNavigator();

export type MainNavigationParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedNavigator: undefined;
};

export const MainNavigator = () => {
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
        <Stack.Screen
          name="ProtectedNavigator"
          component={ProtectedNavigator}
        />
      )}
    </Stack.Navigator>
  );
};
