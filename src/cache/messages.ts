/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { GET_MESSAGES_QUERY } from '../hooks';
import { CreateMessageInput, GetMessageOutput } from '../gql/graphql';

export const updateMessages = (
  cache: ApolloCache<any>,
  chatId: string,
  message: CreateMessageInput
  //   pageNo: number
) => {
  const messagesQueryOptions = {
    query: GET_MESSAGES_QUERY,
    variables: {
      chatId,
      pageNo: 9,
    },
  };

  const existing = cache.readQuery<{ getMessages: GetMessageOutput }>(
    messagesQueryOptions
  );

  if (existing && existing.getMessages?.messages) {
    const existingMessages = existing.getMessages.messages;

    console.log(existingMessages);

    const senderUser = existingMessages.find(
      (msg) => msg.senderUser?.isLoggedInUser
    )?.senderUser;

    const newMessage = {
      ...message,
      senderUser: senderUser
        ? { ...senderUser, __typename: 'UserOutput' }
        : undefined,
      __typename: 'GetMessageOutputData',
    };

    const updatedMessages = {
      ...existing.getMessages,
      messages: [...existingMessages, newMessage],
    };

    console.log(updatedMessages);

    cache.writeQuery({
      ...messagesQueryOptions,
      data: {
        getMessages: updatedMessages,
      },
      broadcast: true,
    });
  } else {
    console.warn('No existing messages in cache. Skipping cache update.');
  }
};
