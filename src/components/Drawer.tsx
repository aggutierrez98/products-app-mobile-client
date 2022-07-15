import React from 'react';
import {DrawerItem} from './DrawerItem';
import {LogoMenu} from './LogoMenu';
import {
  DrawerContentScrollView,
  ItemsContainer,
} from '../theme/components/Drawer';
import {MenuUser} from './MenuUser';

export const CustomDrawer = () => {
  return (
    <DrawerContentScrollView>
      <LogoMenu />

      <MenuUser />

      <ItemsContainer>
        <DrawerItem
          icon="inventory"
          title="Products"
          screen="ProductsNavigator"
        />
        <DrawerItem
          icon="category"
          title="Categories"
          screen="CategoriesScreen"
        />
        <DrawerItem icon="people" title="Users" screen="UsersNavigator" />
        <DrawerItem icon="account-box" title="Profile" screen="ProfileScreen" />
        <DrawerItem icon="logout" title="Logout" />
      </ItemsContainer>
    </DrawerContentScrollView>
  );
};
