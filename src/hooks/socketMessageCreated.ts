import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import {
  GetMessageOutput,
  SubscriptionMessageCreatedArgs,
} from '../gql/graphql';
import { updateChats, updateMessages } from '../cache';
import { useGetMyInformation } from './useGetMyInformation';

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...GetMessageOutputFragment
    }
  }
`);

// ✅ Custom React Hook — to be called inside a React component
export const useSocketMessageCreated = (
  variables: SubscriptionMessageCreatedArgs,
  chatId: string
) => {
  const { user } = useGetMyInformation();

  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        console.log('Subscription data:', data.data);
        updateMessages(
          client.cache,
          chatId,
          data.data.messageCreated as unknown as GetMessageOutput,
          user?._id
        );
        updateChats(
          client.cache,
          chatId,
          data.data.messageCreated as unknown as GetMessageOutput
        );
      }
    },
  });
};
