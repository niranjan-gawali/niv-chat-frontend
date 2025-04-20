import { useLazyQuery } from '@apollo/client';
import { graphql } from '../gql';

export const GET_SINGLE_CHAT_QUERY = graphql(`
  query FindChat($id: ID!) {
    findChat(id: $id) {
      ...ChatFragment
    }
  }
`);

const useGetChatById = () => {
  const [getChatById, { data }] = useLazyQuery(GET_SINGLE_CHAT_QUERY, {
    fetchPolicy: 'network-only',
  });

  const getChat = async (chatId: string) => {
    console.log(chatId, ' CHAT ID');
    return await getChatById({ variables: { id: chatId } });
  };

  return { data, getChat };
};

export { useGetChatById };
