import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';
import {MainNavigator} from './src/navigator/MainNavigator';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from './src/theme/theme';
import {client} from './src/graphql/client';

const App = () => {
  const theme = useColorScheme();
  useEffect(() => SplashScreen.hide(), []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
