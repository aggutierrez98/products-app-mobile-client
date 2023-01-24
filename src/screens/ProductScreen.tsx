import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {Platform, RefreshControl, ScrollView} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useProduct} from '../hooks/useProduct';
import {Loading} from '../components/Loading';
import {ModalEditPhoto} from '../components/ModalEditPhoto';
import {
  Button,
  FormContainer,
  Input,
  Label,
  PickerContainer,
} from '../theme/detailScreenStyles';
import {useTheme} from 'styled-components';
import {ButtonSaveText} from '../theme/defaultStlyes';
import {ProductImage} from '../components/products/ProductImage';
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';

interface Props
  extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
}: Props) => {
  const {
    product,
    categories,
    loading,
    loadingMutation,
    tempImage,
    modalVisible,
    refreshing,
    error,
    closeModal,
    openModal,
    saveOrUpdate,
    onChange,
    takePhotoHandler,
    takePhotoFromGalleryHandler,
    refetchProduct,
  } = useProduct(idFromParams, nameFromParams);
  const {colors} = useTheme();

  useShowErrorMessages(error);

  return (
    <>
      <ScrollView
        refreshControl={
          idFromParams ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refetchProduct}
              progressViewOffset={10}
              progressBackgroundColor={colors.headerBackground}
              colors={[colors.text]}
            />
          ) : (
            <></>
          )
        }>
        {idFromParams?.length > 0 && (
          <ProductImage
            loading={loading}
            image={product?.image}
            tempImage={tempImage?.uri}
            openModal={openModal}
          />
        )}

        <FormContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Label>Product name</Label>
          <Input
            placeholder="Product"
            placeholderTextColor={colors.placeholder}
            value={product.name !== undefined ? product.name : nameFromParams}
            onChangeText={value => onChange(value, 'name')}
          />
          <Label>Description</Label>
          <Input
            placeholder="Description"
            placeholderTextColor={colors.placeholder}
            value={product?.description}
            onChangeText={value => onChange(value, 'description')}
          />
          <Label>Price</Label>
          <Input
            placeholder="Price"
            placeholderTextColor={colors.placeholder}
            value={product?.price}
            keyboardType="numeric"
            onChangeText={value => onChange(value, 'price')}
          />
          <Label>Select category</Label>

          <PickerContainer>
            <Picker
              selectedValue={product?.category}
              style={{
                fontSize: 18,
              }}
              dropdownIconColor={colors.text}
              dropdownIconRippleColor={colors.primary}
              onValueChange={itemValue => {
                onChange(itemValue, 'category');
              }}>
              {categories?.map(category => (
                <Picker.Item
                  label={category.name}
                  value={category.id}
                  key={category.id}
                  style={{color: colors.text}}
                />
              ))}
            </Picker>
          </PickerContainer>

          <Button activeOpacity={0.8} onPress={saveOrUpdate}>
            <ButtonSaveText>Save</ButtonSaveText>
          </Button>
        </FormContainer>

        <ModalEditPhoto
          closeModal={closeModal}
          modalVisible={modalVisible}
          takePhoto={takePhotoHandler}
          takePhotoFromGallery={takePhotoFromGalleryHandler}
        />
      </ScrollView>

      {loadingMutation && <Loading />}
    </>
  );
};
