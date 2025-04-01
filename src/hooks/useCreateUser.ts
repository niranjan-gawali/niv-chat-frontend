import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      firstName
      lastName
      username
      createdAt
      updatedAt
    }
  }
`);

const useCreateUserMutation = () => {
  return useMutation(CREATE_USER_MUTATION);
};

export { useCreateUserMutation };
