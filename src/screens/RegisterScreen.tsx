import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import Text from '../components/CustomText';
import {Logo} from '../components/Logo';
import {useAuth} from '../hooks/useAuth';
import {loginStyles} from '../theme/loginTheme';
import {Loading} from './Loading';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const [hidePass, setHidePass] = useState(true);

  const {
    name,
    email,
    password,
    inputError,
    loading,
    onChange,
    registerHandler,
  } = useAuth();

  useEffect(() => {
    if (inputError) {
      Alert.alert('Error', inputError, [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [inputError]);

  return (
    <>
      {loading && <Loading />}

      <KeyboardAvoidingView
        style={{flex: 1, marginBottom: 0, position: 'relative'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Background>
          <View style={loginStyles.formContainer}>
            <Logo />
            <Text style={loginStyles.title}>Registro</Text>
            <Text style={loginStyles.label}>Nombre</Text>
            <TextInput
              style={[
                loginStyles.inputField,
                Platform.OS === 'ios' && loginStyles.inputFieldIOS,
              ]}
              placeholder="Ingrese su nombre"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="default"
              underlineColorAndroid={'white'}
              selectionColor="white"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={value => onChange(value, 'name')}
              value={name}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                registerHandler();
              }}
            />

            <Text style={loginStyles.label}>Email</Text>
            <TextInput
              style={[
                loginStyles.inputField,
                Platform.OS === 'ios' && loginStyles.inputFieldIOS,
              ]}
              placeholder="Ingrese su email"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="email-address"
              underlineColorAndroid={'white'}
              selectionColor="white"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={value => onChange(value, 'email')}
              value={email}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                registerHandler();
              }}
            />

            <Text style={loginStyles.label}>Contraseña</Text>
            <View style={{position: 'relative'}}>
              <TextInput
                style={[
                  loginStyles.inputField,
                  Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                ]}
                placeholder="Ingrese su contraseña"
                placeholderTextColor="rgba(255,255,255,0.4)"
                secureTextEntry={hidePass ? true : false}
                underlineColorAndroid={'white'}
                selectionColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'password')}
                value={password}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  registerHandler();
                }}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 8, top: 12}}
                activeOpacity={0.5}
                onPress={() => setHidePass(!hidePass)}>
                <Icon
                  name={hidePass ? 'visibility' : 'visibility-off'}
                  size={25}
                  color="grey"
                />
              </TouchableOpacity>
            </View>

            <View style={loginStyles.bottomContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.buttom}
                onPress={() => {
                  Keyboard.dismiss();
                  registerHandler();
                }}>
                <Text style={loginStyles.buttomText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.buttonToNav}
                onPress={() => navigation.replace('LoginScreen')}>
                <Text style={loginStyles.newUserbuttomText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      </KeyboardAvoidingView>
    </>
  );
};
