import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {useAuth} from '../hooks/useAuth';
import {Loading} from '../components/Loading';
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
  FormButtomText,
} from '../theme/authScreenStyles';
import {useTheme} from 'styled-components';
import {useShowErrorMessages} from '../hooks/useShowErrorMessages';

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

  useShowErrorMessages(inputError);

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
              placeholder="Insert your name"
              placeholderTextColor={colors.authInputPlaceholder}
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
                registerHandler();
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
