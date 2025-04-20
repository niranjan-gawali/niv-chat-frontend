import { graphql } from '../gql';

export const MessageFragment = graphql(`
  fragment GetMessageOutputFragment on GetMessageOutput {
    _id
    content
    createdAt
    updatedAt
    senderUser {
      _id
      firstName
      lastName
      email
      username
      createdAt
      updatedAt
      profilePicture
      isLoggedInUser
    }
  }
`);
