import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {componentStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExpireStorage from '../helpers/saveDataToStorage';
import {useApolloClient} from '@apollo/client';

export const CustomDrawer = ({navigation}: DrawerContentComponentProps) => {
  const client = useApolloClient();

  const logout = async () => {
    await ExpireStorage.removeItem('x-token');
    await client.clearStore();
  };

  return (
    <DrawerContentScrollView>
      {/* Parte del Logo */}
      <View style={{alignItems: 'center', marginTop: 30, marginBottom: -10}}>
        <Text style={{...componentStyles.menuTexto, fontWeight: 'bold'}}>
          ProductosApp
        </Text>
        <Image
          source={require('../assets/react-logo-blue.png')}
          style={{
            width: 150,
            height: 150,
          }}
        />
      </View>

      {/* Opciones del menu */}
      <View style={componentStyles.menuContainer}>
        <TouchableOpacity
          style={{
            ...componentStyles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('ProductsNavigator')}>
          <Icon
            style={{...componentStyles.menuTexto, marginRight: 5}}
            name="inventory"
            size={23}
            color="black"
          />
          <Text style={componentStyles.menuTexto}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...componentStyles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('CategoriesScreen')}>
          <Icon
            style={{...componentStyles.menuTexto, marginRight: 5}}
            name="category"
            size={23}
            color="black"
          />
          <Text style={componentStyles.menuTexto}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...componentStyles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('UsersNavigator')}>
          <Icon
            style={{...componentStyles.menuTexto, marginRight: 5}}
            name="people"
            size={23}
            color="black"
          />
          <Text style={componentStyles.menuTexto}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...componentStyles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon
            style={{...componentStyles.menuTexto, marginRight: 5}}
            name="account-box"
            size={23}
            color="black"
          />
          <Text style={componentStyles.menuTexto}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...componentStyles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={logout}>
          <Icon
            style={{...componentStyles.menuTexto, marginRight: 5}}
            name="logout"
            size={23}
            color="black"
          />
          <Text style={componentStyles.menuTexto}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
