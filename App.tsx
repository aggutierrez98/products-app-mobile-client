import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';
import {MainNavigator} from './src/navigator/MainNavigator';
import {client} from './src/graphql/client';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './src/theme/theme';
import {useColorScheme} from 'react-native';

const App = () => {
  useEffect(() => SplashScreen.hide(), []);
  const theme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
