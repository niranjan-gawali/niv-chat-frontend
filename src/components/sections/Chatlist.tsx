import { Chat } from '../../common';
import { useSocketMessageCreated } from '../../hooks';
import { SingleChatBox } from '../elements';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | undefined;
  handleFetchMessages: (chatId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  fetchOlderChats: () => void;
}

const ChatList = ({
  chats,
  selectedChat,
  handleFetchMessages,
  sidebarOpen,
  setSidebarOpen,
  fetchOlderChats,
}: ChatListProps) => {
  useSocketMessageCreated(
    { chatIds: chats.map((c) => c._id) ?? [] },
    selectedChat?._id ?? ''
  );

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 transform shadow-xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:relative md:translate-x-0 md:w-1/4 md:min-w-[250px] overflow-y-auto`}
    >
      <h2 className='text-lg font-bold mb-4 dark:text-white'>Chats</h2>
      <ul className='space-y-2'>
        {chats &&
          chats.map((chat) => {
            return (
              <SingleChatBox
                key={chat._id}
                chat={chat}
                selectedChat={selectedChat}
                setSidebarOpen={setSidebarOpen}
                handleFetchMessages={handleFetchMessages}
              />
            );
          })}
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
