/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { ChatOutput } from '../gql/graphql';
import { GET_CHATS_QUERY } from '../hooks';

export const updateChatList = (
  cache: ApolloCache<any>,
  chat: ChatOutput,
  userId: string
) => {
  const chatQueryOptions = {
    query: GET_CHATS_QUERY,
    variables: {
      cursor: null,
    },
  };

  const existing = cache.readQuery<{
    findChats: ChatOutput[];
  }>(chatQueryOptions);

  if (existing && existing.findChats) {
    if (!existing) return;

    const updatedUsers = chat.users?.map((u) => ({
      ...u,
      isLoggedInUser: u._id === userId,
    }));

    const updatedChats = [
      { ...chat, users: updatedUsers },
      ...(existing.findChats as unknown as ChatOutput[]),
    ];

    console.log(updatedChats);

    cache.writeQuery({
      ...chatQueryOptions,
      data: {
        findChats: [...updatedChats] as unknown as ChatOutput[],
      },
    });
  } else {
    console.warn('No existing messages in cache. Skipping cache update.');
  }
};
