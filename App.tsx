import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import ExpireStorage from './src/helpers/saveDataToStorage';
import Config from 'react-native-config';
import {createUploadLink} from 'apollo-upload-client';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const httpLink = createUploadLink({
  uri: Config.API_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await ExpireStorage.getItem(Config.AUTH_KEY);

  return {
    headers: {
      ...headers,
      'x-token': token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
