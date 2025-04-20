import moment from 'moment';
import { Chat } from '../../common';

interface SingleChatBoxInterface {
  chat: Chat;
  handleFetchMessages: (chatId: string) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedChat: Chat | undefined;
}

const SingleChatBox = ({
  chat,
  handleFetchMessages,
  setSidebarOpen,
  selectedChat,
}: SingleChatBoxInterface) => {
  const name = chat.isGroupChat
    ? chat.groupName
    : chat.users.find((u) => !u.isLoggedInUser)?.firstName;

  const profilePicture = chat.users?.find(
    (u) => !u.isLoggedInUser
  )?.profilePicture;

  const lastMessage = chat.lastMessage?.content || '';
  const lastMessageTime = chat.lastMessage?.createdAt
    ? moment(chat.lastMessage.createdAt).fromNow()
    : '';

  return (
    <>
      <li
        key={chat._id}
        className={`flex items-start p-2 rounded-md cursor-pointer transition-colors ${
          selectedChat?._id === chat._id
            ? 'bg-gray-200 text-white dark:text-black'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
        }`}
        onClick={() => {
          handleFetchMessages(chat._id);
          setSidebarOpen(false);
        }}
      >
        <div className='flex-shrink-0 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden'>
          {profilePicture ? (
            <img
              src={profilePicture}
              className='w-full h-full object-cover rounded-full'
            />
          ) : (
            name?.charAt(0).toUpperCase()
          )}
        </div>

        <div className='ml-3 min-w-0 flex-1'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold truncate text-black'>{name}</p>
            {lastMessageTime && (
              <span className='text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap'>
                {lastMessageTime}
              </span>
            )}
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 truncate'>
            {lastMessage}
          </p>
        </div>
      </li>
    </>
  );
};

export default SingleChatBox;
