import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { updateChats, updateMessages } from '../cache';

const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($chatId: ID!, $content: String!) {
    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {
      ...GetMessageOutputFragment
    }
  }
`);

const useCreateMessage = () => {
  const [createMessageMutation, { data, loading, error }] =
    useMutation(CREATE_MESSAGE);

  const createMessage = async (chatId: string, content: string) => {
    try {
      await createMessageMutation({
        variables: { chatId, content },
        update(cache, { data }) {
          if (data?.createMessage) {
            updateMessages(cache, chatId, data.createMessage);
            updateChats(cache, chatId, data.createMessage);
          }
        },
      });
    } catch (err) {
      console.error('Error creating message:', err);
    }
  };

  return { createMessage, message: data?.createMessage, loading, error };
};

export { useCreateMessage };
