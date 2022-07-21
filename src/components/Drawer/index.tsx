import React from 'react';
import {DrawerItem} from './DrawerItem';
import {LogoMenu} from './LogoMenu';
import {DrawerContentScrollView, ItemsContainer} from './styles';
import {MenuUser} from './MenuUser';
import {useAuth} from '../../hooks/useAuth';

export const CustomDrawer = () => {
  const {logout} = useAuth();

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

        <DrawerItem icon="logout" title="Logout" onPress={() => logout()} />
      </ItemsContainer>
    </DrawerContentScrollView>
  );
};
