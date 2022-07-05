import {useLazyQuery, useQuery} from '@apollo/client';
import {useEffect} from 'react';
import {GET_USER} from '../graphql/queries';
export const useUser = (id: string) => {
  //   const {data} = useQuery(GET_USER, {
  //     variables: {id},
  //     fetchPolicy: 'network-only',
  //   });
  const [getUser, {data}] = useLazyQuery(GET_USER, {
    variables: {id},
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log({id});
    getUser({variables: {id}});
  }, []);
};
