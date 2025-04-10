import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { Chat } from '../common';

export const GET_CHATS_QUERY = graphql(`
  query findChats($pageNo: Int!) {
    findChats(chatInput: { pageNo: $pageNo }) {
      chats {
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
      totalChatCount
    }
  }
`);

const useGetChats = (pageNo: number = 1) => {
  const { data, loading, error } = useQuery(GET_CHATS_QUERY, {
    variables: { pageNo },
  });

  return {
    chats: data?.findChats.chats as Chat[],
    totalChatCount: data?.findChats.totalChatCount,
    loading,
    error,
  };
};

export { useGetChats };
