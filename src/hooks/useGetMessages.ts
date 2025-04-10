import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
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

const useGetMessages = (chatId: string, pageNo: number) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [totalMessageCount, setTotalMessageCount] = useState<number>(0);

  const { data, loading, error } = useQuery(GET_MESSAGES_QUERY, {
    variables: { chatId, pageNo },
    fetchPolicy: 'network-only',
    skip: chatId.length === 0,
  });

  useEffect(() => {
    if (data?.getMessages) {
      const newMessages = data.getMessages.messages.filter(
        (msg) => !allMessages.some((prev) => prev._id === msg._id)
      );
      setAllMessages((prev) => [...prev, ...newMessages]);
      setTotalMessageCount(data.getMessages.totalMessageCount);
    }
  }, [data]);

  const hasMore = useMemo(() => {
    return allMessages.length < totalMessageCount;
  }, [allMessages.length, totalMessageCount]);

  return {
    messages: allMessages,
    hasMore,
    loading,
    error,
  };
};

export { useGetMessages };
