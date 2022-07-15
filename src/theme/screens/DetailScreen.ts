import styled from 'styled-components/native';
import {ButtonSave, Text, TextInput} from '../defaultStlyes';

export const FormContainer = styled.KeyboardAvoidingView`
  flex: 1;
  margin: 20px 20px;
`;

export const Label = styled(Text)`
  font-size: 18px;
  margin-bottom: 5px;
  font-family: ${p => p.theme.fonts.bold};
`;

export const ActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color: grey;
  font-size: 30px;
`;

export const Input = styled(TextInput)`
  padding: 5px 20px;
  margin-top: 5px;
  margin-bottom: 25px;
  border-width: 1px;
`;

export const PickerContainer = styled.View`
  border-radius: 25px;
  border-color: ${p => p.theme.colors.foreground};
  border-width: 1px;
  margin-bottom: 20px;
  padding-left: 5px;
`;

export const Button = styled(ButtonSave)`
  margin: 20px;
  width: 90%;
`;

export const AvatarActivityIndicator = styled(ActivityIndicator)`
  height: 250px;
  position: relative;
  /* margin-top: 20px; */
`;
