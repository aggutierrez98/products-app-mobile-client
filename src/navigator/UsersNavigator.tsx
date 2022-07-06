import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from './ProtectedNavigator';
import {UsersScreen} from '../screens/UsersScreen';
import {UserScreen} from '../screens/UserScreen';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions, DrawerActions} from '@react-navigation/native';

export type UsersStackParams = {
  UsersScreen: undefined;
  UserScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<UsersStackParams>();

interface Props
  extends NativeStackScreenProps<ProtectedNavigationParams, 'UsersNavigator'> {}

export const UsersNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Users',
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon
              style={{marginRight: 15}}
              name="reorder"
              size={23}
              color="black"
            />
          </TouchableOpacity>
        ),
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={() => navigation.goBack()}>
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'UsersScreen',
                    params: {},
                  }),
                )
              }>
              <Icon
                style={{marginRight: 15}}
                name="arrow-back"
                size={23}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
