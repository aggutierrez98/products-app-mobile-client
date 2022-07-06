import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  Image,
  // Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useUser} from '../hooks/useUser';
import {UsersStackParams} from '../navigator/UsersNavigator';
import {LoadingScreen} from './LoadingScreen';

interface Props
  extends NativeStackScreenProps<UsersStackParams, 'UserScreen'> {}

export const UserScreen = ({
  route: {
    params: {id: idFromParams = '', name: nameFromParams = ''},
  },
}: //   navigation,
Props) => {
  const {
    loading,
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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del usuario</Text>
        <TextInput
          placeholder="Producto"
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

        <Button title="Guardar" onPress={updateUserFunction} color="#5856d6" />

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

        {user?.image?.length > 0 && !tempUri && (
          <Image
            source={{uri: user.image}}
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
