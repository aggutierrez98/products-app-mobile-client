import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import ProtectedNavigator from './ProtectedNavigator';
import {useAuth} from '../hooks/useAuth';
import GeneralStatusBarColor from '../components/StatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';

const Stack = createNativeStackNavigator();

export type MainNavigationParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedNavigator: undefined;
};

export const MainNavigator = () => {
  const {user, userError} = useAuth();
  useShowErrorMessages(userError);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GeneralStatusBarColor />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
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
    </SafeAreaView>
  );
};
