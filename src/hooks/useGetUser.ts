import { useLazyQuery } from '@apollo/client';
import { graphql } from '../gql';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/UserSlice';
const GET_USER_QUERY = graphql(`
  query GetUser {
    getUser {
      ...UserFragment
    }
  }
`);

const useGetUser = () => {
  const dispatch = useDispatch();
  const [getUser, { data }] = useLazyQuery(GET_USER_QUERY, {
    fetchPolicy: 'network-only',
  });

  dispatch(setUserData(data?.getUser));

  return {
    userData: data?.getUser,
    fetchUserDetails: getUser,
  };
};

export { useGetUser };
