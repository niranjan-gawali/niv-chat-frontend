/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { Message } from '../common';

export const GET_MESSAGES_QUERY = graphql(`
  query GetMessages($chatId: ID!, $cursor: String) {
    getMessages(getMessageInput: { chatId: $chatId, cursor: $cursor }) {
      ...GetMessageOutputFragment
    }
  }
`);

const useGetMessages = (chatId: string, cursor?: string) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const { data, loading, error, fetchMore } = useQuery(GET_MESSAGES_QUERY, {
    variables: { chatId, cursor },
    fetchPolicy: 'network-only',
    skip: !chatId,
  });

  // Reset when chatId changes
  useEffect(() => {
    setAllMessages([]);
  }, [chatId]);

  // Add initial messages from query
  useEffect(() => {
    if (data?.getMessages?.length) {
      setAllMessages((prev: any) => {
        const unique = data.getMessages.filter(
          (msg) => !prev.some((m: Message) => m._id === msg._id)
        );
        return [...unique, ...prev];
      });
    }
  }, [data]);

  const fetchOlderMessages = async () => {
    if (allMessages.length === 0) return;

    const lastMsg = allMessages[allMessages.length - 1];
    const newCursor = lastMsg._id;

    try {
      const { data: fetchedData } = await fetchMore({
        variables: { chatId, cursor: newCursor },
      });

      const olderMessages = fetchedData?.getMessages ?? [];

      setAllMessages((prev: any) => {
        const unique = olderMessages.filter(
          (msg) => !prev.some((m: Message) => m._id === msg._id)
        );
        return [...prev, ...unique];
      });
    } catch (err) {
      console.error('Error while fetching older messages:', err);
    }
  };

  return {
    messages: allMessages,
    loading,
    error,
    fetchOlderMessages,
  };
};

export { useGetMessages };
