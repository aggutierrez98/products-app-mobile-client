import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@apollo/client';
import {GET_USERS} from '../graphql/queries';
import {GetUsersRes} from '../interfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UsersStackParams} from '../navigator/UsersNavigator';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UsersScreen'> {}

export const UsersScreen = ({navigation}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, refetch}: GetUsersRes = useQuery(GET_USERS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });

  const users = data?.getUsers.users;

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  const {top} = useSafeAreaInsets();

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
            refreshing={refreshing}
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
            onPress={() => {
              navigation.navigate('UserScreen', {
                id: item.id,
                name: item.name,
              });
            }}>
            <Text style={styles.productName}>{item.name}</Text>
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
