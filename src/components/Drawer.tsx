import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/CustomText';
import {DrawerItem} from './DrawerItem';
import {useAuth} from '../hooks/useAuth';
import {FadeInImage} from './FadeInImage';
import {LogoMenu} from './LogoMenu';

export const CustomDrawer = () => {
  const {user} = useAuth();

  return (
    <DrawerContentScrollView style={{backgroundColor: '#112B3C'}}>
      {/* Logo */}
      <View style={styles.logo}>
        <LogoMenu />
      </View>

      {/* User */}
      <View style={styles.userContainer}>
        <FadeInImage
          source={
            user?.image
              ? {
                  uri: user?.image,
                }
              : require('../assets/avatar-placeholder.png')
          }
          style={styles.avatarInDrawer}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.userName}>
            {user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.userEmail}>
            {user?.email}
          </Text>
        </View>
      </View>

      {/*Menu */}
      <View style={styles.menuContainer}>
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
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 35,
  },
  avatarInDrawer: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  userContainer: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
    width: '60%',
    marginLeft: 30,
  },
  textContainer: {marginLeft: 10, justifyContent: 'space-around'},
  userName: {fontSize: 18},
  userEmail: {color: '#B5B5B5', fontSize: 12},
  logo: {alignItems: 'center', marginTop: 30, marginBottom: -10},
});
