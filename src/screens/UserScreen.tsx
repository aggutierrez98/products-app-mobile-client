import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  Image,
  RefreshControl,
  // Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {componentStyles} from '../components/styles';
import {useUser} from '../hooks/useUser';
import {UsersStackParams} from '../navigator/UsersNavigator';
import {LoadingScreen} from './LoadingScreen';

export const DEFAULT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
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
    refetchUser,
    onChange,
    updateUserFunction,
    tempUri,
    user,
    roles,
    takePhoto,
    takePhotoFromGallery,
  } = useUser(idFromParams, nameFromParams);

  if (loading) <LoadingScreen />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refetchUser}
          progressViewOffset={10}
          progressBackgroundColor="white"
          colors={['black']}
        />
      }>
      <View style={styles.container}>
        <View style={componentStyles.avatarContainer}>
          <Image
            source={{
              uri: user?.image || tempUri || DEFAULT_IMAGE,
            }}
            style={componentStyles.avatar}
          />
        </View>
        <Text style={styles.label}>Email: {user.email}</Text>

        <Text style={styles.label}>Nombre del usuario</Text>
        <TextInput
          placeholder="Usuario"
          style={styles.textInput}
          placeholderTextColor="grey"
          value={user?.name || nameFromParams}
          onChangeText={value => onChange(value, 'name')}
        />
        <Text style={styles.label}>Seleccione el rol</Text>
        <Picker
          selectedValue={user?.role}
          style={{color: 'black'}}
          onValueChange={itemValue => {
            onChange(itemValue, 'role');
          }}>
          {roles?.map(role => (
            <Picker.Item label={role.name} value={role.id} key={role.id} />
          ))}
        </Picker>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}>
          <Button title="Camara" onPress={takePhoto} color="#5856d6" />
          <View style={{width: 10}} />
          <Button
            title="Galeria"
            onPress={takePhotoFromGallery}
            color="#5856d6"
          />
        </View>

        <Button
          title="Guardar"
          onPress={async () => {
            await updateUserFunction();
            navigation.goBack();
          }}
          color="#5856d6"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 10, marginHorizontal: 20},
  label: {fontSize: 18, color: 'black', marginTop: 15},
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
