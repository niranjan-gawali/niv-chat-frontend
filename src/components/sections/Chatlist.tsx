import { useState } from 'react';
import { Chat } from '../../common';
import { useSocketMessageCreated } from '../../hooks';
import { SingleChatBox } from '../elements';
import AddChat from '../modal/AddChat';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | undefined;
  handleFetchMessages: (chatId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  fetchOlderChats: () => void;
  debouncedSetSearchValue: (searchParam: string) => void;
}

const ChatList = ({
  chats,
  selectedChat,
  handleFetchMessages,
  sidebarOpen,
  setSidebarOpen,
  fetchOlderChats,
  debouncedSetSearchValue,
}: ChatListProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useSocketMessageCreated(
    { chatIds: chats.map((c) => c._id) ?? [] },
    selectedChat?._id ?? ''
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const timeOut = setTimeout(() => {
      debouncedSetSearchValue(value);
    }, 400);

    return () => clearTimeout(timeOut);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 p-5 transform shadow-2xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:relative md:translate-x-0 md:w-1/4 md:min-w-[260px] overflow-y-auto`}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
          Chats
        </h2>
        <button
          onClick={() => setOpenMenu(true)}
          className='w-10 h-10 rounded-full bg-amber-500 text-white text-xl font-bold hover:bg-amber-600 shadow-md transition-all'
          aria-label='Add Chat'
        >
          +
        </button>
      </div>

      {/* Search */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search chats...'
          value={searchValue}
          onChange={handleSearchChange}
          className='w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
        />
      </div>

      <AddChat isOpen={openMenu} onClose={() => setOpenMenu(false)} />

      {/* Chat List */}
      <ul className='space-y-3'>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <SingleChatBox
              key={chat._id}
              chat={chat}
              selectedChat={selectedChat}
              setSidebarOpen={setSidebarOpen}
              handleFetchMessages={handleFetchMessages}
            />
          ))
        ) : (
          <p className='text-center text-gray-500 dark:text-gray-400 text-sm'>
            No chats found.
          </p>
        )}
      </ul>

      {/* Load More */}
      <div className='flex justify-center mt-8'>
        <button
          className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md'
          onClick={fetchOlderChats}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
          <span>Load More</span>
        </button>
      </div>
    </aside>
  );
};

export default ChatList;
