import { graphql } from '../gql';

export const UserFragment = graphql(`
  fragment UserFragment on UserOutput {
    _id
    email
    firstName
    lastName
    username
    createdAt
    updatedAt
    profilePicture
    isLoggedInUser
  }
`);
