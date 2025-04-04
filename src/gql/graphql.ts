/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ChatInput = {
  /** Page number */
  pageNo?: InputMaybe<Scalars['Int']['input']>;
};

export type ChatOutput = {
  __typename?: 'ChatOutput';
  _id: Scalars['String']['output'];
  groupAdmin?: Maybe<Scalars['String']['output']>;
  groupName?: Maybe<Scalars['String']['output']>;
  isGroupChat: Scalars['Boolean']['output'];
  lastMessage?: Maybe<CreateMessageOutput>;
  users?: Maybe<Array<UserOutput>>;
};

export type CreateChatInput = {
  groupAdmin?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  isGroupChat?: Scalars['Boolean']['input'];
  users: Array<Scalars['String']['input']>;
};

export type CreateMessageInput = {
  /** Chat Id */
  chatId: Scalars['ID']['input'];
  /** message content */
  content: Scalars['String']['input'];
};

export type CreateMessageOutput = {
  __typename?: 'CreateMessageOutput';
  /** message id */
  _id: Scalars['ID']['output'];
  /** message content */
  content: Scalars['String']['output'];
  /** Message creation date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Message update date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type GetMessageInput = {
  /** Chat Id */
  chatId: Scalars['ID']['input'];
  /** Page number */
  pageNo?: InputMaybe<Scalars['Int']['input']>;
};

export type GetMessageOutput = {
  __typename?: 'GetMessageOutput';
  /** message id */
  _id: Scalars['ID']['output'];
  /** message content */
  content: Scalars['String']['output'];
  /** Message creation date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  senderUser?: Maybe<UserOutput>;
  /** Message update date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatOutput;
  createMessage: CreateMessageOutput;
  createUser: UserOutput;
  removeChat: ChatOutput;
  removeMessage: RemoveMessageOutput;
  updateChat: ChatOutput;
  updateMessage: GetMessageOutput;
  updateUser: UserOutput;
};


export type MutationCreateChatArgs = {
  createChatInput: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveChatArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveMessageArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdateChatArgs = {
  updateChatInput: UpdateChatInput;
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  findChats: Array<ChatOutput>;
  findOne: ChatOutput;
  getMessage: GetMessageOutput;
  getMessages: Array<GetMessageOutput>;
  getMyInformation: UserBasicOutput;
};


export type QueryFindChatsArgs = {
  chatInput?: InputMaybe<ChatInput>;
};


export type QueryFindOneArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMessageArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetMessagesArgs = {
  getMessageInput: GetMessageInput;
};

export type RemoveMessageOutput = {
  __typename?: 'RemoveMessageOutput';
  /** message id */
  _id: Scalars['ID']['output'];
  /** message content */
  message: Scalars['String']['output'];
};

export type UpdateChatInput = {
  _id: Scalars['ID']['input'];
  groupAdmin?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  isGroupChat?: InputMaybe<Scalars['Boolean']['input']>;
  users?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateMessageInput = {
  _id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserBasicOutput = {
  __typename?: 'UserBasicOutput';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserOutput = {
  __typename?: 'UserOutput';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  isLoggedInUser?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserOutput', _id: string, email: string, firstName: string, lastName: string, username: string, createdAt: any, updatedAt: any } };

export type FindChatsQueryVariables = Exact<{
  pageNo: Scalars['Int']['input'];
}>;


export type FindChatsQuery = { __typename?: 'Query', findChats: Array<{ __typename?: 'ChatOutput', _id: string, groupName?: string | null, groupAdmin?: string | null, isGroupChat: boolean, lastMessage?: { __typename?: 'CreateMessageOutput', _id: string, content: string, createdAt?: any | null, updatedAt?: any | null } | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName: string, lastName: string, username: string, isLoggedInUser?: boolean | null }> | null }> };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
  pageNo: Scalars['Int']['input'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'GetMessageOutput', _id: string, content: string, createdAt?: any | null, updatedAt?: any | null, senderUser?: { __typename?: 'UserOutput', _id: string, firstName: string, lastName: string, email: string, username: string, createdAt: any, updatedAt: any, profilePicture?: string | null } | null }> };

export type GetMyInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyInformationQuery = { __typename?: 'Query', getMyInformation: { __typename?: 'UserBasicOutput', _id: string, email: string, username: string } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const FindChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findChats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findChats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"groupAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isLoggedInUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isGroupChat"}}]}}]}}]} as unknown as DocumentNode<FindChatsQuery, FindChatsQueryVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getMessageInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"senderUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetMyInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyInformation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetMyInformationQuery, GetMyInformationQueryVariables>;