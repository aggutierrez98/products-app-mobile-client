import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useProduct} from '../hooks/useProduct';
import {DEFAULT_IMAGE} from './UserScreen';
import {LoadingScreen} from './LoadingScreen';

interface Props
  extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
  navigation,
}: Props) => {
  const {
    product,
    categories,
    loading,
    tempUri,
    saveOrUpdate,
    onChange,
    takePhoto,
    takePhotoFromGallery,
    refetchProduct,
  } = useProduct(idFromParams, nameFromParams);

  if (loading) <LoadingScreen />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refetchProduct}
          progressViewOffset={10}
          progressBackgroundColor="white"
          colors={['black']}
        />
      }>
      <View style={styles.container}>
        <Text style={styles.label}>Product name</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product.name !== undefined ? product.name : nameFromParams}
          onChangeText={value => onChange(value, 'name')}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Description"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product?.description}
          onChangeText={value => onChange(value, 'description')}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Price"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product?.price}
          keyboardType="numeric"
          onChangeText={value => onChange(value, 'price')}
        />
        <Text style={styles.label}>Select a category</Text>

        <Picker
          selectedValue={product?.category}
          style={{color: 'black'}}
          onValueChange={itemValue => {
            onChange(itemValue, 'category');
          }}>
          {categories?.map(category => (
            <Picker.Item
              label={category.name}
              value={category.id}
              key={category.id}
            />
          ))}
        </Picker>

        {idFromParams?.length > 0 && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <Button title="Camera" onPress={takePhoto} color="#5856d6" />
              <View style={{width: 10}} />
              <Button
                title="Galery"
                onPress={takePhotoFromGallery}
                color="#5856d6"
              />
            </View>
            <Image
              source={{uri: product?.image || tempUri || DEFAULT_IMAGE}}
              style={{
                width: '100%',
                height: 300,
                marginTop: 10,
                marginBottom: 20,
              }}
            />
          </>
        )}

        <Button
          title="Save"
          onPress={async () => {
            await saveOrUpdate();
            navigation.goBack();
          }}
          color="#5856d6"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 20, marginHorizontal: 20},
  label: {fontSize: 18, color: 'black'},
  textInput: {
    color: 'black',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
