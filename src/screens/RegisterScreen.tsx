import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {WhiteLogo} from '../components/WhiteLogo';
import {useAuth} from '../hooks/useAuth';
import {loginStyles} from '../theme/loginTheme';
import {LoadingScreen} from './LoadingScreen';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
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

  if (loading) return <LoadingScreen />;

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
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
          <TextInput
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry
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

          <View style={loginStyles.bottomContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.buttom}
              onPress={registerHandler}>
              <Text style={loginStyles.buttomText}>Registrarse</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}>
            <Text style={loginStyles.buttomText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
