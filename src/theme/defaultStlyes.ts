import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

interface ContainerProps {
  refreshing: boolean;
}

export const ScreenContainer = styled.View<ContainerProps>`
  background-color: ${p => p.theme.colors.background};
  flex: 1;
  margin: 10px 10px;
`;

export const Text = styled.Text`
  font-family: ${p => p.theme.fonts.light};
  color: ${p => p.theme.colors.text};
`;

export const TextInput = styled.TextInput`
  font-family: ${p => p.theme.fonts.light};
  color: ${p => p.theme.colors.text};
  border-radius: 20px;
  border-color: ${p => p.theme.colors.foreground};
  height: 45px;
`;

export const ButtonSave = styled.TouchableOpacity`
  font-family: ${p => p.theme.fonts.bold};
  background-color: ${p => p.theme.colors.primary};
  align-items: center;
  border-radius: 20px;
  padding: 10px;
  width: 40%;
`;

export const ButtonSaveText = styled.Text`
  color: #efefef;
  /* color: ${p => p.theme.colors.text}; */
  font-family: ${p => p.theme.fonts.bold};
  font-size: 18px;
`;

export const defaultStyles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
