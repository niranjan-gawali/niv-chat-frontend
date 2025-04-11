/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { GET_MESSAGES_QUERY } from '../hooks';
import { CreateMessageOutput, GetMessageOutput } from '../gql/graphql';

export const updateMessages = (
  cache: ApolloCache<any>,
  chatId: string,
  message: CreateMessageOutput
) => {
  const messagesQueryOptions = {
    query: GET_MESSAGES_QUERY,
    variables: {
      chatId,
    },
  };

  const existing = cache.readQuery<{ getMessages: GetMessageOutput }>(
    messagesQueryOptions
  );

  if (existing && existing.getMessages) {
    const existingMessages = existing.getMessages;

    const senderUser = existingMessages.find(
      (msg) => msg.senderUser?.isLoggedInUser
    )?.senderUser;

    const newMessage = {
      ...message,
      senderUser: senderUser
        ? { ...senderUser, __typename: 'UserOutput' }
        : undefined,
      __typename: 'GetMessageOutput',
    };

    // const updatedMessages = [...existingMessages, newMessage];
    // const updatedMessages = [newMessage, ...existingMessages];
    const updatedMessages = [newMessage, ...existingMessages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    console.log('before sort:  ', updatedMessages);

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
