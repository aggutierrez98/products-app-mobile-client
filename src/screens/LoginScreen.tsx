import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Platform} from 'react-native';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {Loading} from '../components/Loading';
import {useAuth} from '../hooks/useAuth';
import {
  FormBottomContainer,
  FormButtomText,
  FormButton,
  FormButtonToNav,
  FormNewUserbuttomText,
  FormPassIcon,
  KeyboardAvoidingView,
  FormContainer,
  FormLabel,
  FormTitle,
  FormInput,
  FormShowPassButton,
  FormPassInputContainer,
} from '../theme/authScreenStyles';

import {useTheme} from 'styled-components';

interface Props extends NativeStackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const [hidePass, setHidePass] = useState(true);
  const {colors} = useTheme();
  const {email, password, onChange, loading, loginHandler, inputError} =
    useAuth();

  useEffect(() => {
    if (inputError) {
      Alert.alert('Error in login', inputError.message, [
        {
          text: 'Ok',
          style: 'default',
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
            <FormTitle>Login</FormTitle>
            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Insert your email"
              placeholderTextColor={colors.authInputPlaceholder}
              keyboardType="email-address"
              underlineColorAndroid={colors.text}
              selectionColor={colors.text}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={value => onChange(value, 'email')}
              value={email}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                loginHandler();
              }}
            />

            <FormLabel>Password</FormLabel>
            <FormPassInputContainer>
              <FormInput
                placeholder="Insert your ********"
                placeholderTextColor={colors.authInputPlaceholder}
                secureTextEntry={hidePass ? true : false}
                underlineColorAndroid={colors.text}
                selectionColor={colors.text}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'password')}
                value={password}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  loginHandler();
                }}
              />
              <FormShowPassButton
                activeOpacity={0.5}
                onPress={() => setHidePass(!hidePass)}>
                <FormPassIcon
                  name={hidePass ? 'visibility' : 'visibility-off'}
                  size={25}
                />
              </FormShowPassButton>
            </FormPassInputContainer>
            <FormBottomContainer>
              <FormButton
                activeOpacity={0.8}
                onPress={() => {
                  Keyboard.dismiss();
                  loginHandler();
                }}>
                <FormButtomText>Login</FormButtomText>
              </FormButton>
              <FormButtonToNav
                activeOpacity={0.8}
                onPress={() => navigation.replace('RegisterScreen')}>
                <FormNewUserbuttomText>New account</FormNewUserbuttomText>
              </FormButtonToNav>
            </FormBottomContainer>
          </FormContainer>
        </Background>
      </KeyboardAvoidingView>
    </>
  );
};
