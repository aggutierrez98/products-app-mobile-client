import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useProduct} from '../hooks/useProduct';
import {Loading} from './Loading';
import {TouchableOpacity} from 'react-native';
import {FadeInImage} from '../components/FadeInImage';
import Text from '../components/CustomText';
import {ModalEditPhoto} from '../components/ModalEditPhoto';

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
    loadingMutation,
    tempImage,
    modalVisible,
    refreshing,
    closeModal,
    openModal,
    saveOrUpdate,
    onChange,
    takePhoto,
    takePhotoFromGallery,
    refetchProduct,
  } = useProduct(idFromParams, nameFromParams);

  return (
    <>
      <ScrollView
        refreshControl={
          idFromParams ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refetchProduct}
              progressViewOffset={10}
              progressBackgroundColor="#205375"
              colors={['#EFEFEF', '#F66B0E']}
            />
          ) : (
            <></>
          )
        }>
        {idFromParams?.length > 0 && (
          <>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#EFEFEF"
                style={{
                  height: 300,
                }}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  openModal();
                }}>
                <FadeInImage
                  source={
                    tempImage || product?.image
                      ? {
                          uri: tempImage?.uri || product?.image,
                        }
                      : require('../assets/no-image.jpg')
                  }
                  style={{
                    width: '100%',
                    height: 300,
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        )}

        <View style={styles.container}>
          <Text style={styles.label}>Product name</Text>
          <TextInput
            placeholder="Product"
            style={styles.textInput}
            placeholderTextColor="#b5b5b5"
            value={product.name !== undefined ? product.name : nameFromParams}
            onChangeText={value => onChange(value, 'name')}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Description"
            style={styles.textInput}
            placeholderTextColor="#b5b5b5"
            value={product?.description}
            onChangeText={value => onChange(value, 'description')}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="Price"
            style={styles.textInput}
            placeholderTextColor="#b5b5b5"
            value={product?.price}
            keyboardType="numeric"
            onChangeText={value => onChange(value, 'price')}
          />
          <Text style={styles.label}>Select category</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={product?.category}
              style={styles.pickerStyle}
              dropdownIconColor="#EFEFEF"
              dropdownIconRippleColor="#F66B0E"
              onValueChange={itemValue => {
                onChange(itemValue, 'category');
              }}>
              {categories?.map(category => (
                <Picker.Item
                  style={styles.pickerItem}
                  label={category.name}
                  value={category.id}
                  key={category.id}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonStyle}
            onPress={async () => {
              await saveOrUpdate();
              navigation.goBack();
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ModalEditPhoto
          closeModal={closeModal}
          modalVisible={modalVisible}
          takePhoto={takePhoto}
          takePhotoFromGallery={takePhotoFromGallery}
        />
      </ScrollView>

      {loadingMutation && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 20, marginHorizontal: 20},
  label: {fontSize: 18, marginBottom: 5, fontFamily: 'RobotoCondensed-Bold'},
  pickerContainer: {
    borderRadius: 25,
    borderColor: '#205375',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 5,
  },
  pickerStyle: {
    fontSize: 18,
  },
  pickerItem: {
    fontFamily: 'RobotoCondensed-Light',
    color: '#EFEFEF',
  },
  buttonStyle: {
    marginVertical: 20,
    backgroundColor: '#F66B0E',
    // backgroundColor: '#205375',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Bold',
  },
  textInput: {
    color: '#EFEFEF',
    borderWidth: 1,
    fontFamily: 'RobotoCondensed-Light',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#205375',
    height: 45,
    marginTop: 5,
    marginBottom: 25,
  },
  modalContent: {
    backgroundColor: '#112B3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
