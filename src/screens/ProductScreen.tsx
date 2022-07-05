/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useProduct} from '../hooks/useProduct';
import {Category} from '../interfaces/products';

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
    saveOrUpdate,
    onChange,
    takePhoto,
    takePhotoFromGallery,
    tempUri,
  } = useProduct(idFromParams, nameFromParams);

  useEffect(() => {
    navigation.setOptions({
      title: nameFromParams ? nameFromParams : 'Sin nombre del producto',
    });
  }, [navigation, nameFromParams]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product?.name || nameFromParams}
          onChangeText={value => onChange(value, 'name')}
        />
        <Text style={styles.label}>Modifique el precio</Text>
        <TextInput
          placeholder="Price"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product?.price}
          keyboardType="numeric"
          onChangeText={value => onChange(value, 'price')}
        />
        <Text style={styles.label}>Seleccione la categoria</Text>

        <Picker
          selectedValue={product?.category}
          style={{color: 'black'}}
          onValueChange={itemValue => {
            onChange(itemValue, 'category');
          }}>
          {categories?.map((category: Category) => (
            <Picker.Item
              label={category.name}
              value={category.id}
              key={category.id}
            />
          ))}
        </Picker>

        <Button title="Guardar" onPress={saveOrUpdate} color="#5856d6" />

        {idFromParams?.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Camara" onPress={takePhoto} color="#5856d6" />
            <View style={{width: 10}} />
            <Button
              title="Galeria"
              onPress={takePhotoFromGallery}
              color="#5856d6"
            />
          </View>
        )}

        {product?.image?.length > 0 && !tempUri && (
          <Image
            source={{uri: product.image}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}

        {tempUri && (
          <Image
            source={{uri: tempUri}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 10, marginHorizontal: 20},
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
