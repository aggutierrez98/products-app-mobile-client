/* eslint-disable react-native/no-inline-styles */
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CustomDrawer = ({navigation}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      {/* Parte del avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
          }}
          style={styles.avatar}
        />
      </View>

      {/* Opciones del menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('ProductsNavigator')}>
          <Icon
            style={{...styles.menuTexto, marginRight: 5}}
            name="inventory"
            size={23}
            color="black"
          />
          <Text style={styles.menuTexto}>Productos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('CategoriesScreen')}>
          <Icon
            style={{...styles.menuTexto, marginRight: 5}}
            name="category"
            size={23}
            color="black"
          />
          <Text style={styles.menuTexto}>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('UsersNavigator')}>
          <Icon
            style={{...styles.menuTexto, marginRight: 5}}
            name="people"
            size={23}
            color="black"
          />
          <Text style={styles.menuTexto}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('ProtectedScreen')}>
          <Icon
            style={{...styles.menuTexto, marginRight: 5}}
            name="account-box"
            size={23}
            color="black"
          />
          <Text style={styles.menuTexto}>Usuario</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
