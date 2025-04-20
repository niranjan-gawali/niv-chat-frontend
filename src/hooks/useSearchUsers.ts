import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

export const SEARCH_USERS = graphql(`
  query SearchUser($searchParam: String!) {
    searchUser(searchParam: $searchParam) {
      ...UserFragment
    }
  }
`);

const useSearchUsers = (searchParam: string) => {
  const { data } = useQuery(SEARCH_USERS, {
    variables: { searchParam },
    fetchPolicy: 'network-only',
    skip: !searchParam,
  });

  return { users: data?.searchUser };
};

export { useSearchUsers };
