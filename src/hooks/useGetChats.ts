import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { Chat } from '../common';
import { useEffect, useState } from 'react';

export const GET_CHATS_QUERY = graphql(`
  query findChats($cursor: String) {
    findChats(ChatInput: { cursor: $cursor }) {
      _id
      groupName
      groupAdmin
      lastMessage {
        _id
        content
        createdAt
        updatedAt
      }
      users {
        _id
        firstName
        lastName
        username
        isLoggedInUser
      }
      isGroupChat
    }
  }
`);

const useGetChats = (cursor: string | null = null) => {
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const { data, loading, error, fetchMore } = useQuery(GET_CHATS_QUERY, {
    variables: { cursor },
  });

  useEffect(() => {
    if (data && data?.findChats.length > 0) {
      setAllChats((prev) => {
        const unique = data.findChats.filter(
          (msg) => !prev.some((m) => m._id === msg._id)
        );
        return [...unique, ...prev];
      });
    }
  }, [data]);

  const fetchOlderChats = async () => {
    if (allChats.length === 0) return;

    const lastChat = allChats[allChats.length - 1];
    const newCursor = lastChat._id;

    try {
      const { data: fetchedData } = await fetchMore({
        variables: { cursor: newCursor },
      });

      const olderChats = fetchedData?.findChats ?? [];

      setAllChats((prev) => {
        const unique = olderChats.filter(
          (msg) => !prev.some((m) => m._id === msg._id)
        );
        return [...prev, ...unique];
      });
    } catch (err) {
      console.error('Error while fetching older messages:', err);
    }
  };

  return {
    chats: allChats,
    loading,
    error,
    fetchOlderChats,
  };
};

export { useGetChats };
