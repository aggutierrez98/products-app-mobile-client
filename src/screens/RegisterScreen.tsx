import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Platform} from 'react-native';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {useAuth} from '../hooks/useAuth';
import {Loading} from '../components/Loading';
import {FormButtomText} from '../theme/screens/AuthScreenStyles';
import {
  FormContainer,
  KeyboardAvoidingView,
  FormInput,
  FormTitle,
  FormLabel,
  FormPassInputContainer,
  FormShowPassButton,
  FormPassIcon,
  FormBottomContainer,
  FormButtonToNav,
  FormNewUserbuttomText,
  FormButton,
} from '../theme/screens/AuthScreenStyles';
import {useTheme} from 'styled-components';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const [hidePass, setHidePass] = useState(true);
  const {colors} = useTheme();

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Background>
          <FormContainer>
            <Logo />
            <FormTitle>Register</FormTitle>
            <FormLabel>Name</FormLabel>
            <FormInput
              placeholder="Name"
              placeholderTextColor="rgba(255,255,255,0.35)"
              keyboardType="default"
              underlineColorAndroid={colors.text}
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={value => onChange(value, 'name')}
              value={name}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                registerHandler();
              }}
            />

            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.35)"
              keyboardType="email-address"
              underlineColorAndroid={colors.text}
              selectionColor={colors.text}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={value => onChange(value, 'email')}
              value={email}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                registerHandler();
              }}
            />

            <FormLabel>Password</FormLabel>
            <FormPassInputContainer>
              <FormInput
                placeholder="********"
                placeholderTextColor="rgba(255,255,255,0.35)"
                secureTextEntry={hidePass ? true : false}
                underlineColorAndroid={colors.text}
                selectionColor={colors.text}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'password')}
                value={password}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  registerHandler();
                }}
              />
              <FormShowPassButton
                activeOpacity={0.5}
                onPress={() => setHidePass(!hidePass)}>
                <FormPassIcon
                  name={hidePass ? 'visibility' : 'visibility-off'}
                  size={25}
                  color={colors.placeholder}
                />
              </FormShowPassButton>
            </FormPassInputContainer>

            <FormBottomContainer>
              <FormButton
                activeOpacity={0.8}
                onPress={() => {
                  Keyboard.dismiss();
                  registerHandler();
                }}>
                <FormButtomText>Register</FormButtomText>
              </FormButton>
              <FormButtonToNav
                activeOpacity={0.8}
                onPress={() => navigation.replace('LoginScreen')}>
                <FormNewUserbuttomText>Login</FormNewUserbuttomText>
              </FormButtonToNav>
            </FormBottomContainer>
          </FormContainer>
        </Background>
      </KeyboardAvoidingView>
    </>
  );
};
