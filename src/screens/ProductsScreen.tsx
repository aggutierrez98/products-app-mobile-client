import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useProducts} from '../hooks/useProducts';
import {ProductItem} from '../components/products/ProductItem';
import {ItemSeparator} from '../components/ItemSeparator';
import {ScreenContainer} from '../theme/defaultStlyes';
import {useTheme} from 'styled-components';

interface ProuductsProps
  extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({}: ProuductsProps) => {
  const {colors} = useTheme();

  const {
    products,
    refreshing,
    loading,
    deleteProductFunc,
    loadProductsFromBackend,
  } = useProducts();

  return (
    <ScreenContainer refreshing={refreshing}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={loadProductsFromBackend}
            progressViewOffset={10}
            progressBackgroundColor={colors.headerBackground}
            colors={[colors.text]}
          />
        }
        data={products}
        keyExtractor={product => product.id}
        renderItem={({item}) => (
          <ProductItem item={item} deleteProductFunc={deleteProductFunc} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </ScreenContainer>
  );
};
