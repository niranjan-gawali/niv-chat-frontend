import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../gql';
import { Message } from '../common';

export const GET_MESSAGES_QUERY = graphql(`
  query GetMessages($chatId: ID!, $pageNo: Int!) {
    getMessages(getMessageInput: { chatId: $chatId, pageNo: $pageNo }) {
      messages {
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
          isLoggedInUser
        }
      }
      totalMessageCount
    }
  }
`);

const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [totalMessageCount, setTotalMessageCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const [fetchMessages, { loading, error }] = useLazyQuery(GET_MESSAGES_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.getMessages) {
        setMessages((prevMessages: Message[]) => {
          // Append only new messages to avoid duplication
          const newMessages = data.getMessages.messages.filter(
            (msg) => !prevMessages.some((prevMsg) => prevMsg._id === msg._id)
          );
          return [...prevMessages, ...newMessages];
        });

        setTotalMessageCount(data.getMessages.totalMessageCount);
        setHasMore(data.getMessages.messages.length > 0);
      }
    },
  });

  const getMessages = async (chatId: string, newPageNo: number = 1) => {
    // if (loading || !hasMore) return;

    // Reset pagination and messages when chatId changes
    if (currentChatId !== chatId) {
      setCurrentChatId(chatId);
      setMessages([]);
    }

    fetchMessages({ variables: { chatId, pageNo: newPageNo } });
  };

  // Automatically fetch messages when chatId changes
  useEffect(() => {
    if (currentChatId) {
      getMessages(currentChatId, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  return {
    getMessages,
    messages,
    totalMessageCount,
    hasMore,
    loading,
    error,
  };
};

export { useGetMessages };
