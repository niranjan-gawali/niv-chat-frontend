import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($chatId: ID!, $content: String!) {
    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {
      _id
      content
      createdAt
      updatedAt
    }
  }
`);
const useCreateMessage = () => {
  const [createMessageMutation, { data, loading, error }] =
    useMutation(CREATE_MESSAGE);

  const createMessage = async (chatId: string, content: string) => {
    try {
      await createMessageMutation({ variables: { chatId, content } });
    } catch (err) {
      console.error('Error creating message:', err);
    }
  };

  return { createMessage, message: data?.createMessage, loading, error };
};

export { useCreateMessage };
