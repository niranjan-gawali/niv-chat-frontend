import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { graphql } from '../gql';
import { ChatOutput } from '../gql/graphql';
import { useGetChatById } from './useGetChatById';
import { updateChatList } from '../cache';
import { useGetMyInformation } from './useGetMyInformation';

const CREATE_CHAT = graphql(`
  mutation CreateChat($users: [String!]!) {
    createChat(createChatInput: { users: $users }) {
      _id
      isGroupChat
      groupName
      groupAdmin
    }
  }
`);

const useCreateChat = () => {
  const [createChatMutation] = useMutation(CREATE_CHAT);
  const [data, setData] = useState<ChatOutput>();
  const [error, setError] = useState<Error | null>(null);

  const { getChat } = useGetChatById();
  const { user } = useGetMyInformation();

  const createChat = async (userIds: string[]) => {
    try {
      setError(null);
      const response = await createChatMutation({
        variables: {
          users: userIds,
        },
        update: async (cache, { data }) => {
          if (data?.createChat) {
            const createdChatId = data?.createChat._id;
            const chatData = await getChat(createdChatId ?? '');
            updateChatList(
              cache,
              chatData.data?.findChat as ChatOutput,
              user?._id ?? ''
            );
          }
        },
      });
      setData(response.data?.createChat);

      return response.data?.createChat;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err);
      return null;
    }
  };

  const resetError = () => setError(null);
  return {
    createChat,
    data,
    error,
    resetError,
  };
};

export default useCreateChat;
