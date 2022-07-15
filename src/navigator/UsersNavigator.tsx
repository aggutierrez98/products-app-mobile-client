import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from './ProtectedNavigator';
import {UsersScreen} from '../screens/UsersScreen';
import {UserScreen} from '../screens/UserScreen';
import {Header} from '../components/Header';
import {useTheme} from 'styled-components';

export type UsersStackParams = {
  UsersScreen: undefined;
  UserScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<UsersStackParams>();

interface NavProps
  extends NativeStackScreenProps<ProtectedNavigationParams, 'UsersNavigator'> {}

export const UsersNavigator = ({}: NavProps) => {
  const {colors} = useTheme();

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
          contentStyle: {backgroundColor: colors.background},
        };
      }}>
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};
