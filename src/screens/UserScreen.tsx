import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, Platform, RefreshControl, ScrollView} from 'react-native';
import {useUser} from '../hooks/useUser';
import {UsersStackParams} from '../navigator/UsersNavigator';
import {Loading} from '../components/Loading';
import {ModalEditPhoto} from '../components/ModalEditPhoto';
import {useTheme} from 'styled-components';
import {
  Button,
  FormContainer,
  Input,
  Label,
  PickerContainer,
} from '../theme/detailScreenStyles';
import {ButtonSaveText} from '../theme/defaultStlyes';
import {UserImage} from '../components/users/UserImage';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UserScreen'> {}

export const UserScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
  navigation,
}: Props) => {
  const {
    loading,
    loadingMutation,
    error,
    refreshing,
    modalVisible,
    tempImage,
    user,
    roles,
    openModal,
    closeModal,
    refetchUser,
    onChange,
    updateUserFunction,
    takePhotoHandler,
    takePhotoFromGalleryHandler,
  } = useUser(idFromParams, nameFromParams);
  const {colors} = useTheme();

  useEffect(() => {
    if (error) {
      Alert.alert('Error:', error.message, [
        {
          text: 'Ok',
          style: 'default',
        },
      ]);
    }
  }, [error]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetchUser}
            progressViewOffset={10}
            progressBackgroundColor={colors.headerBackground}
            colors={[colors.text]}
          />
        }>
        <UserImage
          loading={loading}
          image={user?.image}
          tempImage={tempImage?.uri}
          openModal={openModal}
        />

        <FormContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Label>User Email:</Label>
          <Input>{user.email}</Input>

          <Label>User Name</Label>
          <Input
            placeholder="Usuario"
            placeholderTextColor={colors.placeholder}
            value={user?.name}
            onChangeText={value => onChange(value, 'name')}
          />
          <Label>Seleccione el rol</Label>
          <PickerContainer>
            <Picker
              selectedValue={user?.role}
              onValueChange={itemValue => {
                onChange(itemValue, 'role');
              }}>
              {roles?.map(role => (
                <Picker.Item
                  label={role.name}
                  value={role.id}
                  key={role.id}
                  style={{color: colors.text}}
                />
              ))}
            </Picker>
          </PickerContainer>

          <Button
            activeOpacity={0.8}
            onPress={async () => {
              await updateUserFunction();
              navigation.goBack();
            }}>
            <ButtonSaveText>Save</ButtonSaveText>
          </Button>
        </FormContainer>

        <ModalEditPhoto
          modalVisible={modalVisible}
          closeModal={closeModal}
          takePhoto={takePhotoHandler}
          takePhotoFromGallery={takePhotoFromGalleryHandler}
        />
      </ScrollView>
      {loadingMutation && <Loading />}
    </>
  );
};
