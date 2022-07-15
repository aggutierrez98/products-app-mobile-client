import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {Loading} from '../components/Loading';
import ProtectedNavigator from './ProtectedNavigator';
import {useAuth} from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

export type MainNavigationParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedNavigator: undefined;
};

export const MainNavigator = () => {
  const {loading, user} = useAuth();

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
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
      {loading && <Loading />}
    </>
  );
};
