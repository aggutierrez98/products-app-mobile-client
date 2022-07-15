import baseStyled, {
  DefaultTheme,
  ThemedStyledInterface,
} from 'styled-components';

const fonts = {
  bold: 'RobotoCondensed-Bold',
  boldItalic: 'RobotoCondensed-BoldItalic',
  italic: 'RobotoCondensed-Italic',
  light: 'RobotoCondensed-Light',
  lightItalic: 'RobotoCondensed-LightItalic',
  regular: 'RobotoCondensed-Regular',
};

export const darkTheme: DefaultTheme = {
  fonts,
  colors: {
    background: '#112B3C',
    foreground: '#205375',
    text: '#EFEFEF',
    primary: '#F66B0E',
    placeholder: '#B5B5B5',
  },
};

export const lightTheme: DefaultTheme = {
  fonts,
  colors: {
    background: '#EFEFEF',
    foreground: '#B5B5B5',
    text: '#112B3C',
    primary: '#F66B0E',
    placeholder: '#205375',
  },
};

export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;
