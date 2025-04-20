import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ...UserFragment
    }
  }
`);

const useCreateUserMutation = () => {
  return useMutation(CREATE_USER_MUTATION);
};

export { useCreateUserMutation };
