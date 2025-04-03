import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const GET_MY_INFORMATION_QUERY = graphql(`
  query GetMyInformation {
    getMyInformation {
      _id
      email
      username
    }
  }
`);

const useGetMyInformation = () => {
  const { data, loading, error } = useQuery(GET_MY_INFORMATION_QUERY);

  console.log('GETTING HERE DATA ....', data);

  return { user: data?.getMyInformation, loading, error };
};

export { useGetMyInformation };
