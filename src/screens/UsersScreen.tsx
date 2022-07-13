import React, {useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UsersStackParams} from '../navigator/UsersNavigator';
import {useUsers} from '../hooks/useUsers';
import {Picker} from '@react-native-picker/picker';
import {Header} from '../components/Header';
import {UserItem} from '../components/UserItem';
import {ItemSeparator} from '../components/ItemSeparator';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UsersScreen'> {}

export const UsersScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {
    users,
    refreshing,
    loading,
    options,
    selectedFilter,
    loadProductsFromBackend,
    deactivateUserFunc,
    activateUserFunc,
    changeFilter,
  } = useUsers();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title={'Users'}>
          <Picker
            selectedValue={selectedFilter}
            style={{
              width: 150,
              marginRight: -15,
            }}
            onValueChange={changeFilter}>
            {options?.map(option => (
              <Picker.Item
                label={option.name}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        </Header>
      ),
    });
  }, [options, navigation, selectedFilter, changeFilter]);

  return (
    <View
      style={{
        marginTop: refreshing ? top + 20 : 0,
        flex: 1,
        marginHorizontal: 10,
      }}>
      <FlatList
        style={{marginTop: 10}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={loadProductsFromBackend}
            progressViewOffset={10}
            progressBackgroundColor="#205375"
            colors={['#EFEFEF', '#F66B0E']}
          />
        }
        data={users}
        keyExtractor={user => user.id}
        renderItem={({item}) => (
          <UserItem
            activateUserFunc={activateUserFunc}
            deactivateUserFunc={deactivateUserFunc}
            item={item}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
