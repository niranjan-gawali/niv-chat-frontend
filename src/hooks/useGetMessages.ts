import { useLazyQuery } from '@apollo/client';
import { graphql } from '../gql';

const GET_MESSAGES_QUERY = graphql(`
  query GetMessages($chatId: ID!, $pageNo: Int!) {
    getMessages(getMessageInput: { chatId: $chatId, pageNo: $pageNo }) {
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
      }
    }
  }
`);

const useGetMessages = () => {
  const [fetchMessages, { data, loading, error }] =
    useLazyQuery(GET_MESSAGES_QUERY);

  const getMessages = async (chatId: string, pageNo: number = 1) => {
    fetchMessages({ variables: { chatId, pageNo } });
  };

  console.log('DATA', data);

  return { getMessages, messages: data?.getMessages, loading, error };
};

export { useGetMessages };
