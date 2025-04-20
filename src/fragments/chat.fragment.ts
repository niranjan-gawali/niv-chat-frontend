import { graphql } from '../gql';

export const ChatFragment = graphql(`
  fragment ChatFragment on ChatOutput {
    _id
    groupName
    groupAdmin
    lastMessage {
      _id
      content
      createdAt
      updatedAt
    }
    users {
      _id
      firstName
      lastName
      username
      isLoggedInUser
    }
    isGroupChat
  }
`);
