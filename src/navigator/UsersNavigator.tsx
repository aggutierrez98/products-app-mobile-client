import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {MainNavigationParams} from './DrawerNavigator';
import {CommonActions} from '@react-navigation/native';
import {UsersScreen} from '../screens/UsersScreen';
import {UserScreen} from '../screens/UserScreen';

export type UsersStackParams = {
  UsersScreen: undefined;
  UserScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<UsersStackParams>();

interface Props
  extends NativeStackScreenProps<MainNavigationParams, 'UsersNavigator'> {}

export const UsersNavigator = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'UserScreen',
                params: {},
              }),
            )
          }>
          <Text style={{color: 'black'}}>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        // options={{title: 'Productos'}}
      />
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};
