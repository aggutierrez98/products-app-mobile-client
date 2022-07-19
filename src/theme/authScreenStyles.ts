import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, TextInput} from './defaultStlyes';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const FormPassIcon = styled(Icon)`
  color: #b5b5b5;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  height: 600px;
  margin-bottom: 50px;
  z-index: 1;
`;

export const FormTitle = styled(Text)`
  font-size: 25px;
  margin-top: 10px;
  font-family: ${p => p.theme.fonts.bold};
`;
export const FormLabel = styled(Text)`
  margin-top: 25px;
  font-size: 20px;
`;
export const FormInput = styled(TextInput)`
  font-size: 20px;
  margin-top: 10px;
`;
export const FormInputFieldIOS = styled(TextInput)`
  font-size: 20px;
`;
export const FormBottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
export const FormButtonToNav = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
`;
export const FormButtomText = styled(Text)`
  font-size: 20px;
  color: ${prop => prop.theme.colors.primary};
  /* margin-top: 10px; */
`;
export const FormPassInputContainer = styled.View`
  position: relative;
`;
export const FormShowPassButton = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 12px;
`;
export const FormButton = styled.TouchableOpacity`
  border-width: 2px;
  border-color: ${p => p.theme.colors.primary};
  padding: 5px 20px;
  border-radius: 100px;
`;
export const FormNewUserbuttomText = styled(Text)`
  font-size: 18px;
  text-decoration: underline;
`;
export const FormNewUserContainer = styled.View`
  align-items: flex-end;
  margin-top: 10px;
`;
