import React from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {ProductsNavigator} from './ProductsNavigator';
import {ProfileScreen} from '../screens/ProfileScreen';
import {useWindowDimensions} from 'react-native';
import {CustomDrawer} from '../components/Drawer';
import {CategoriesScreen} from '../screens/CategoriesScreen';
import {UsersNavigator} from './UsersNavigator';
import {MainNavigationParams} from './MainNavigator';
import {Header} from '../components/Header';
import {useTheme} from 'styled-components';

export type ProtectedNavigationParams = {
  ProductsNavigator: undefined;
  UsersNavigator: undefined;
  CategoriesScreen: undefined;
  ProfileScreen: undefined;
};

const Drawer = createDrawerNavigator<ProtectedNavigationParams>();

interface Props
  extends DrawerScreenProps<MainNavigationParams, 'ProtectedNavigator'> {}

const ProtectedNavigator = ({}: Props) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: width >= 768 ? 'permanent' : 'front',
        sceneContainerStyle: {backgroundColor: colors.background},
      }}>
      <Drawer.Screen name="ProductsNavigator" component={ProductsNavigator} />
      <Drawer.Screen name="UsersNavigator" component={UsersNavigator} />
      <Drawer.Screen
        component={CategoriesScreen}
        name="CategoriesScreen"
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header title="Profile" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProtectedNavigator;
