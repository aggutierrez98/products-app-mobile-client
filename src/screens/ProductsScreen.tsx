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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useProducts} from '../hooks/useProducts';

interface Props
  extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {
    products,
    refreshing,
    loading,
    deleteProductFunc,
    loadProductsFromBackend,
  } = useProducts();

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
            progressBackgroundColor="white"
            colors={['black']}
          />
        }
        data={products}
        keyExtractor={product => product.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              navigation.navigate('ProductScreen', {
                id: item.id,
                name: item.name,
              });
            }}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Estas seguro',
                  'Eliminaras el producto y no se podra recuperar',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                        deleteProductFunc(item.id);
                      },
                    },
                    {
                      text: 'Cancelar',
                      onPress: () => {},
                    },
                  ],
                );
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
