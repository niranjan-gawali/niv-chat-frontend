import { useEffect, useState } from 'react';
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
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 transform shadow-xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:relative md:translate-x-0 md:w-1/4 md:min-w-[250px] overflow-y-auto`}
    >
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white'>
          Chats
        </h2>
        <button
          onClick={() => setOpenMenu(true)}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white text-3xl shadow hover:bg-amber-500 transition duration-200 cursor-pointer dark:text-black'
          aria-label='Add Chat'
        >
          +
        </button>
      </div>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search chats...'
          value={searchValue}
          onChange={handleSearchChange}
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition'
        />
      </div>

      <AddChat isOpen={openMenu} onClose={() => setOpenMenu(false)} />

      <ul className='space-y-2'>
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
          <p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-4'>
            No chats found.
          </p>
        )}
      </ul>

      <div className='flex justify-center mt-6 px-4'>
        <button
          className='flex items-center justify-center gap-2 rounded-xl border border-green-500 bg-green-50 px-6 py-2 text-green-700 font-medium transition hover:bg-green-100 hover:shadow-sm active:scale-95 w-full md:w-auto cursor-pointer'
          onClick={fetchOlderChats}
        >
          <svg
            className='h-5 w-5'
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
          <span className='text-sm md:text-base'>Load More</span>
        </button>
      </div>
    </aside>
  );
};

export default ChatList;
