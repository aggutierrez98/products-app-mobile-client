import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useProducts} from '../hooks/useProducts';
import {ProductItem} from '../components/ProductItem';
import {ItemSeparator} from '../components/ItemSeparator';

interface ProuductsProps
  extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({}: ProuductsProps) => {
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
            progressBackgroundColor="#205375"
            colors={['#EFEFEF', '#F66B0E']}
          />
        }
        data={products}
        keyExtractor={product => product.id}
        renderItem={({item}) => (
          <ProductItem item={item} deleteProductFunc={deleteProductFunc} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
