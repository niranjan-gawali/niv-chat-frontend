import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

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
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_CHATS_QUERY,
    {
      variables: { cursor },
      fetchPolicy: 'cache-and-network',
    }
  );

  const chats = data?.findChats ?? [];

  const fetchOlderChats = async () => {
    if (chats.length === 0) return;

    const lastChat = chats[chats.length - 1];
    const newCursor = lastChat._id;

    try {
      await fetchMore({
        variables: { cursor: newCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          const prevChats = previousResult.findChats;
          const newChats = fetchMoreResult.findChats;

          // Avoid duplicates by _id
          const combinedChats = [
            ...prevChats,
            ...newChats.filter(
              (newChat) => !prevChats.some((c) => c._id === newChat._id)
            ),
          ];

          return {
            findChats: combinedChats,
          };
        },
      });
    } catch (err) {
      console.error('Error while fetching older messages:', err);
    }
  };

  return {
    chats,
    loading,
    error,
    fetchOlderChats,
    refetchChats: refetch,
  };
};

export { useGetChats };
