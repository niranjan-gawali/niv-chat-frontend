import { useQuery, useLazyQuery } from '@apollo/client';
import { graphql } from '../gql';

export const GET_CHATS_QUERY = graphql(`
  query findChats($cursor: String, $searchParam: String) {
    findChats(ChatInput: { cursor: $cursor, searchParam: $searchParam }) {
      ...ChatFragment
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

  const [runSearchQuery, { data: searchData }] = useLazyQuery(GET_CHATS_QUERY, {
    fetchPolicy: 'network-only',
  });

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

  // 👇 New searchChats method that triggers the lazy query
  const searchChats = (searchParam: string, cursor: string | null = null) => {
    runSearchQuery({
      variables: { searchParam, cursor },
    });
  };

  return {
    chats,
    loading,
    error,
    fetchOlderChats,
    refetchChats: refetch,
    searchChats,
    searchResult: searchData?.findChats ?? [],
  };
};

export { useGetChats };
