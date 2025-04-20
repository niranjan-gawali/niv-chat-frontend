/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ChatFragment on ChatOutput {\n    _id\n    groupName\n    groupAdmin\n    lastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n    }\n    users {\n      _id\n      firstName\n      lastName\n      username\n      isLoggedInUser\n    }\n    isGroupChat\n  }\n": typeof types.ChatFragmentFragmentDoc,
    "\n  fragment GetMessageOutputFragment on GetMessageOutput {\n    _id\n    content\n    createdAt\n    updatedAt\n    senderUser {\n      _id\n      firstName\n      lastName\n      email\n      username\n      createdAt\n      updatedAt\n      profilePicture\n      isLoggedInUser\n    }\n  }\n": typeof types.GetMessageOutputFragmentFragmentDoc,
    "\n  fragment UserFragment on UserOutput {\n    _id\n    email\n    firstName\n    lastName\n    username\n    createdAt\n    updatedAt\n    profilePicture\n    isLoggedInUser\n  }\n": typeof types.UserFragmentFragmentDoc,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...GetMessageOutputFragment\n    }\n  }\n": typeof types.MessageCreatedDocument,
    "\n  mutation CreateChat($users: [String!]!) {\n    createChat(createChatInput: { users: $users }) {\n      _id\n      isGroupChat\n      groupName\n      groupAdmin\n    }\n  }\n": typeof types.CreateChatDocument,
    "\n  mutation CreateMessage($chatId: ID!, $content: String!) {\n    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {\n      ...GetMessageOutputFragment\n    }\n  }\n": typeof types.CreateMessageDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...UserFragment\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query FindChat($id: ID!) {\n    findChat(id: $id) {\n      ...ChatFragment\n    }\n  }\n": typeof types.FindChatDocument,
    "\n  query findChats($cursor: String, $searchParam: String) {\n    findChats(ChatInput: { cursor: $cursor, searchParam: $searchParam }) {\n      ...ChatFragment\n    }\n  }\n": typeof types.FindChatsDocument,
    "\n  query GetMessages($chatId: ID!, $cursor: String) {\n    getMessages(getMessageInput: { chatId: $chatId, cursor: $cursor }) {\n      ...GetMessageOutputFragment\n    }\n  }\n": typeof types.GetMessagesDocument,
    "\n  query GetMyInformation {\n    getMyInformation {\n      _id\n      email\n      username\n    }\n  }\n": typeof types.GetMyInformationDocument,
    "\n  query GetUser {\n    getUser {\n      ...UserFragment\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  query SearchUser($searchParam: String!) {\n    searchUser(searchParam: $searchParam) {\n      ...UserFragment\n    }\n  }\n": typeof types.SearchUserDocument,
};
const documents: Documents = {
    "\n  fragment ChatFragment on ChatOutput {\n    _id\n    groupName\n    groupAdmin\n    lastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n    }\n    users {\n      _id\n      firstName\n      lastName\n      username\n      isLoggedInUser\n    }\n    isGroupChat\n  }\n": types.ChatFragmentFragmentDoc,
    "\n  fragment GetMessageOutputFragment on GetMessageOutput {\n    _id\n    content\n    createdAt\n    updatedAt\n    senderUser {\n      _id\n      firstName\n      lastName\n      email\n      username\n      createdAt\n      updatedAt\n      profilePicture\n      isLoggedInUser\n    }\n  }\n": types.GetMessageOutputFragmentFragmentDoc,
    "\n  fragment UserFragment on UserOutput {\n    _id\n    email\n    firstName\n    lastName\n    username\n    createdAt\n    updatedAt\n    profilePicture\n    isLoggedInUser\n  }\n": types.UserFragmentFragmentDoc,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...GetMessageOutputFragment\n    }\n  }\n": types.MessageCreatedDocument,
    "\n  mutation CreateChat($users: [String!]!) {\n    createChat(createChatInput: { users: $users }) {\n      _id\n      isGroupChat\n      groupName\n      groupAdmin\n    }\n  }\n": types.CreateChatDocument,
    "\n  mutation CreateMessage($chatId: ID!, $content: String!) {\n    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {\n      ...GetMessageOutputFragment\n    }\n  }\n": types.CreateMessageDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...UserFragment\n    }\n  }\n": types.CreateUserDocument,
    "\n  query FindChat($id: ID!) {\n    findChat(id: $id) {\n      ...ChatFragment\n    }\n  }\n": types.FindChatDocument,
    "\n  query findChats($cursor: String, $searchParam: String) {\n    findChats(ChatInput: { cursor: $cursor, searchParam: $searchParam }) {\n      ...ChatFragment\n    }\n  }\n": types.FindChatsDocument,
    "\n  query GetMessages($chatId: ID!, $cursor: String) {\n    getMessages(getMessageInput: { chatId: $chatId, cursor: $cursor }) {\n      ...GetMessageOutputFragment\n    }\n  }\n": types.GetMessagesDocument,
    "\n  query GetMyInformation {\n    getMyInformation {\n      _id\n      email\n      username\n    }\n  }\n": types.GetMyInformationDocument,
    "\n  query GetUser {\n    getUser {\n      ...UserFragment\n    }\n  }\n": types.GetUserDocument,
    "\n  query SearchUser($searchParam: String!) {\n    searchUser(searchParam: $searchParam) {\n      ...UserFragment\n    }\n  }\n": types.SearchUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChatFragment on ChatOutput {\n    _id\n    groupName\n    groupAdmin\n    lastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n    }\n    users {\n      _id\n      firstName\n      lastName\n      username\n      isLoggedInUser\n    }\n    isGroupChat\n  }\n"): (typeof documents)["\n  fragment ChatFragment on ChatOutput {\n    _id\n    groupName\n    groupAdmin\n    lastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n    }\n    users {\n      _id\n      firstName\n      lastName\n      username\n      isLoggedInUser\n    }\n    isGroupChat\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMessageOutputFragment on GetMessageOutput {\n    _id\n    content\n    createdAt\n    updatedAt\n    senderUser {\n      _id\n      firstName\n      lastName\n      email\n      username\n      createdAt\n      updatedAt\n      profilePicture\n      isLoggedInUser\n    }\n  }\n"): (typeof documents)["\n  fragment GetMessageOutputFragment on GetMessageOutput {\n    _id\n    content\n    createdAt\n    updatedAt\n    senderUser {\n      _id\n      firstName\n      lastName\n      email\n      username\n      createdAt\n      updatedAt\n      profilePicture\n      isLoggedInUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on UserOutput {\n    _id\n    email\n    firstName\n    lastName\n    username\n    createdAt\n    updatedAt\n    profilePicture\n    isLoggedInUser\n  }\n"): (typeof documents)["\n  fragment UserFragment on UserOutput {\n    _id\n    email\n    firstName\n    lastName\n    username\n    createdAt\n    updatedAt\n    profilePicture\n    isLoggedInUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...GetMessageOutputFragment\n    }\n  }\n"): (typeof documents)["\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...GetMessageOutputFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChat($users: [String!]!) {\n    createChat(createChatInput: { users: $users }) {\n      _id\n      isGroupChat\n      groupName\n      groupAdmin\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChat($users: [String!]!) {\n    createChat(createChatInput: { users: $users }) {\n      _id\n      isGroupChat\n      groupName\n      groupAdmin\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMessage($chatId: ID!, $content: String!) {\n    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {\n      ...GetMessageOutputFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMessage($chatId: ID!, $content: String!) {\n    createMessage(createMessageInput: { chatId: $chatId, content: $content }) {\n      ...GetMessageOutputFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindChat($id: ID!) {\n    findChat(id: $id) {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query FindChat($id: ID!) {\n    findChat(id: $id) {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findChats($cursor: String, $searchParam: String) {\n    findChats(ChatInput: { cursor: $cursor, searchParam: $searchParam }) {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query findChats($cursor: String, $searchParam: String) {\n    findChats(ChatInput: { cursor: $cursor, searchParam: $searchParam }) {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages($chatId: ID!, $cursor: String) {\n    getMessages(getMessageInput: { chatId: $chatId, cursor: $cursor }) {\n      ...GetMessageOutputFragment\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($chatId: ID!, $cursor: String) {\n    getMessages(getMessageInput: { chatId: $chatId, cursor: $cursor }) {\n      ...GetMessageOutputFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyInformation {\n    getMyInformation {\n      _id\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetMyInformation {\n    getMyInformation {\n      _id\n      email\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser {\n    getUser {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    getUser {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUser($searchParam: String!) {\n    searchUser(searchParam: $searchParam) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query SearchUser($searchParam: String!) {\n    searchUser(searchParam: $searchParam) {\n      ...UserFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;