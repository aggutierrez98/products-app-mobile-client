import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useProducts} from '../hooks/useProducts';
import {ProductItem} from '../components/products/ProductItem';
import {ItemSeparator} from '../components/ItemSeparator';
import {ScreenContainer} from '../theme/defaultStlyes';
import {useTheme} from 'styled-components';

interface ProuductsProps
  extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({}: ProuductsProps) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();

  const {
    products,
    refreshing,
    loading,
    deleteProductFunc,
    loadProductsFromBackend,
  } = useProducts();

  return (
    <ScreenContainer refreshing={refreshing} top={top}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={loadProductsFromBackend}
            progressViewOffset={10}
            progressBackgroundColor={colors.foreground}
            colors={[colors.text, colors.primary]}
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
