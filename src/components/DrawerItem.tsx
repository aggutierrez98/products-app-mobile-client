import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../components/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {useAuth} from '../hooks/useAuth';

type NavigationProps = NativeStackNavigationProp<ProtectedNavigationParams>;

interface Props {
  title: string;
  icon: string;
  screen?: keyof ProtectedNavigationParams;
}

export const DrawerItem = ({title, icon, screen}: Props) => {
  const {navigate} = useNavigation<NavigationProps>();
  const {logout} = useAuth();

  return (
    <TouchableOpacity
      style={styles.menuBoton}
      onPress={() => {
        if (screen) navigate(screen);
        else logout();
      }}>
      <Icon style={{marginRight: 10}} name={icon} size={30} color="#F66B0E" />
      <Text style={styles.menuTexto}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuBoton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  menuTexto: {fontSize: 20, fontFamily: 'RobotoCondensed-Regular'},
});
