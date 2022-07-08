import React from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UsersStackParams} from '../navigator/UsersNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUsers} from '../hooks/useUsers';
import {LoadingScreen} from './LoadingScreen';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UsersScreen'> {}

export const UsersScreen = ({navigation}: Props) => {
  const {
    users,
    refreshing,
    loading,
    loadProductsFromBackend,
    deactivateUserFunc,
  } = useUsers();
  const {top} = useSafeAreaInsets();

  if (loading) <LoadingScreen />;

  return (
    <View
      style={{
        marginTop: refreshing ? top + 20 : 0,
        flex: 1,
        marginHorizontal: 10,
      }}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={loadProductsFromBackend}
            progressViewOffset={10}
            progressBackgroundColor="white"
            colors={['black']}
          />
        }
        data={users}
        keyExtractor={user => user.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              navigation.navigate('UserScreen', {
                id: item.id,
                name: item.name,
              });
            }}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Estas seguro', 'Desactivaras el usuario', [
                  {
                    text: 'Ok',
                    onPress: () => {
                      deactivateUserFunc(item.id);
                    },
                  },
                  {
                    text: 'Cancelar',
                    onPress: () => {},
                  },
                ]);
              }}>
              <Icon name="delete-outline" size={23} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    color: 'black',
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
  },
});
