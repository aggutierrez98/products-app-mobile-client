import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, RefreshControl, ScrollView} from 'react-native';
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
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UserScreen'> {}

export const UserScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
}: Props) => {
  const {
    loading,
    loadingMutation,
    refreshing,
    modalVisible,
    tempImage,
    user,
    roles,
    error,
    openModal,
    closeModal,
    refetchUser,
    onChange,
    updateUserFunction,
    takePhotoHandler,
    takePhotoFromGalleryHandler,
  } = useUser(idFromParams, nameFromParams);
  const {colors} = useTheme();

  useShowErrorMessages(error);

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
              // navigation.goBack();
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
