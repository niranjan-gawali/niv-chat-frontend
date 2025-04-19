/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { GET_MESSAGES_QUERY } from '../hooks';
import { GetMessageOutput } from '../gql/graphql';

export const updateMessages = (
  cache: ApolloCache<any>,
  chatId: string,
  message: GetMessageOutput,
  userId?: string
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

  if (userId) {
    console.log('USER ID IS PRESENT : ', userId);
    console.log('NIRANJAN : ', message);
    if (message.senderUser)
      message.senderUser.isLoggedInUser =
        message.senderUser?._id.toString() === userId;
  }

  if (existing && existing.getMessages) {
    const existingMessages = existing.getMessages;

    const updatedMessages = [message, ...existingMessages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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
