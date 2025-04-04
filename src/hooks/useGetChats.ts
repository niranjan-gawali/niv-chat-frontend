import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { Chat } from '../common';

const GET_CHATS_QUERY = graphql(`
  query findChats($pageNo: Int!) {
    findChats(chatInput: { pageNo: $pageNo }) {
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
  }
`);

const useGetChats = (pageNo: number = 1) => {
  const { data, loading, error } = useQuery(GET_CHATS_QUERY, {
    variables: { pageNo },
  });

  console.log('DATA : ', data);

  return { chats: data?.findChats as Chat[], loading, error };
};

export { useGetChats };
