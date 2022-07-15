import {ApolloClient, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';
import Config from 'react-native-config';
import ExpireStorage from '../helpers/saveDataToStorage';

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
