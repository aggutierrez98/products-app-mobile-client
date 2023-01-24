import {ApolloError} from '@apollo/client';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {ERROR_MESSAGES} from '../constants/errorMessages';
import {useAuth} from './useAuth';

export const useShowErrorMessages = (error: ApolloError | undefined) => {
  const {logout} = useAuth();

  useEffect(() => {
    if (!error) return;
    else if (error?.networkError) {
      return Alert.alert('Error in server', ERROR_MESSAGES.serverError, [
        {
          text: 'Ok',
          style: 'default',
        },
      ]);
    } else if (
      error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED' &&
      error.graphQLErrors[0].path![0] !== 'login' &&
      error.graphQLErrors[0].path![0] !== 'register'
    ) {
      Alert.alert(
        'Error in session',
        ERROR_MESSAGES.sessionError,
        [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => logout(),
          },
        ],
        {cancelable: false},
      );
      return;
    } else if (error.graphQLErrors[0].path) {
      const indexError = error.graphQLErrors[0].path[0] as any;
      const errorMessage = ERROR_MESSAGES[indexError];

      return Alert.alert(errorMessage ? errorMessage : 'Error', error.message, [
        {
          text: 'Ok',
          style: 'default',
        },
      ]);
    }
  }, [error, logout]);
};
