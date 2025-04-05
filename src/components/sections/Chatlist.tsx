import { Chat } from '../../common';
import { SingleChatBox } from '../elements';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | undefined;
  handleFetchMessages: (chatId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ChatList = ({
  chats,
  selectedChat,
  handleFetchMessages,
  sidebarOpen,
  setSidebarOpen,
}: ChatListProps) => {
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
    </aside>
  );
};

export default ChatList;
