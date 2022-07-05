/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useUser} from '../hooks/useUser';
import {UsersStackParams} from '../navigator/UsersNavigator';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UserScreen'> {}

export const UserScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
}: //   navigation,
Props) => {
  //   console.log({idFromParams, nameFromParams});

  //   const {
  //     product,
  //     categories,
  //     saveOrUpdate,
  //     onChange,
  //     takePhoto,
  //     takePhotoFromGallery,
  //     tempUri,
  //   } = useProduct(idFromParams, nameFromParams);

  //   useEffect(() => {
  //     navigation.setOptions({
  //       title: nameFromParams ? nameFromParams : 'Sin nombre del producto',
  //     });
  //   }, [navigation, nameFromParams]);

  useUser(idFromParams);

  return (
    <View style={styles.container}>
      {/* <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={product?.name || nameFromParams}
          onChangeText={value => onChange(value, 'name')}
        />

        <Button title="Guardar" onPress={saveOrUpdate} color="#5856d6" />

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
      </ScrollView> */}
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
