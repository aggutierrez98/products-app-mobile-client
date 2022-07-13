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
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {Loading} from './Loading';
import {useAuth} from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../components/CustomText';

interface Props extends NativeStackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const [hidePass, setHidePass] = useState(true);
  const {email, password, onChange, loading, loginHandler, inputError} =
    useAuth();

  useEffect(() => {
    if (inputError) {
      Alert.alert('Login incorrecto', inputError, [
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
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Background>
          <View style={loginStyles.formContainer}>
            <WhiteLogo />
            <Text style={loginStyles.title}>Login</Text>
            <Text style={loginStyles.label}>Email</Text>
            <TextInput
              style={[
                loginStyles.inputField,
                Platform.OS === 'ios' && loginStyles.inputFieldIOS,
              ]}
              placeholder="Input your email"
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
                loginHandler();
              }}
            />

            <Text style={loginStyles.label}>Password</Text>
            <View style={{position: 'relative'}}>
              <TextInput
                style={[
                  loginStyles.inputField,
                  Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                ]}
                placeholder="Input your password"
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
                  loginHandler();
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
                  loginHandler();
                }}>
                <Text style={loginStyles.buttomText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.buttonToNav}
                onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={loginStyles.newUserbuttomText}>New account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      </KeyboardAvoidingView>
    </>
  );
};
