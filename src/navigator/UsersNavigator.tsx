import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from './ProtectedNavigator';
import {UsersScreen} from '../screens/UsersScreen';
import {UserScreen} from '../screens/UserScreen';
import {Header} from '../components/Header';

export type UsersStackParams = {
  UsersScreen: undefined;
  UserScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<UsersStackParams>();

interface NavProps
  extends NativeStackScreenProps<ProtectedNavigationParams, 'UsersNavigator'> {}

export const UsersNavigator = ({}: NavProps) => {
  return (
    <Stack.Navigator
      screenOptions={({route: {params, name}}) => {
        return {
          header: () => (
            <Header
              title={params?.name || 'Users'}
              backButton={name === 'UserScreen'}
            />
          ),
          contentStyle: {backgroundColor: '#112B3C'},
        };
      }}>
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};
