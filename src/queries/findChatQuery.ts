import { graphql } from '../gql';

export const FIND_CHAT_QUERY = graphql(`
  query FindChat($chatId: ID!) {
    findChat(id: $chatId) {
      _id
      isGroupChat
      groupName
      groupAdmin
      lastMessage {
        _id
        content
        createdAt
        updatedAt
      }
    }
  }
`);
