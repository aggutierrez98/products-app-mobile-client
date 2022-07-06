import React from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {ProductsNavigator} from './ProductsNavigator';
import {ProfileScreen} from '../screens/ProfileScreen';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {CustomDrawer} from '../components/Drawer';
import {CategoriesScreen} from '../screens/CategoriesScreen';
import {UsersNavigator} from './UsersNavigator';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainNavigationParams} from './MainNavigator';

export type ProtectedNavigationParams = {
  ProductsNavigator: undefined;
  UsersNavigator: undefined;
  CategoriesScreen: undefined;
  ProfileScreen: undefined;
};

const Drawer = createDrawerNavigator<ProtectedNavigationParams>();

interface Props
  extends DrawerScreenProps<MainNavigationParams, 'ProtectedNavigator'> {}

const ProtectedNavigator = ({navigation}: Props) => {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: width >= 768 ? 'permanent' : 'front',
      }}>
      <Drawer.Screen
        name="ProductsNavigator"
        options={{title: 'Products'}}
        component={ProductsNavigator}
      />
      <Drawer.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          headerShown: true,
          title: 'Categories',
          // drawerContentStyle: {backgroundColor: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              activeOpacity={0.5}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name="reorder" size={23} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="UsersNavigator"
        options={{title: 'Users'}}
        component={UsersNavigator}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
          drawerContentStyle: {backgroundColor: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              activeOpacity={0.5}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name="reorder" size={23} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProtectedNavigator;
