import InfiniteScroll from 'react-infinite-scroller';
import { useRef, useEffect } from 'react';
import { Chat, Message } from '../../common';
import { Menu } from 'lucide-react';
import InputMessageBox from './InputMessageBox';
import { ProfileBox } from '../elements';
import MessageField from '../elements/MessageField';

interface MessageListProps {
  selectedChat?: Chat;
  messages: Message[];
  hasMore: boolean;
  loading: boolean;
  getMessages: (chatId: string, page: number) => void;
  pageNo: number;
  setPageNo: (page: number) => void;
  otherUserName: string;
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const MessageList = ({
  selectedChat,
  messages,
  hasMore,
  loading,
  getMessages,
  pageNo,
  setPageNo,
  otherUserName,
  setSidebarOpen,
  sidebarOpen,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLoadMore = async () => {
    if (loading || !hasMore || !selectedChat) return;

    const nextPage = pageNo + 1;
    await getMessages(selectedChat._id, nextPage);
    setPageNo(nextPage);
  };

  return (
    <section className='flex-1 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg'>
      {/* Header (With Menu Button for Mobile) */}
      <div className='p-3 flex justify-between items-center border-b dark:border-gray-700'>
        <button
          className='md:hidden text-gray-700 dark:text-white'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>
        <h2 className='text-lg font-semibold dark:text-white'>
          {selectedChat
            ? selectedChat.isGroupChat
              ? `Group: ${selectedChat.groupName}`
              : `Chat with ${otherUserName}`
            : 'Select a chat'}
        </h2>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          useWindow={false}
          threshold={100}
        >
          {messages?.length > 0 ? (
            messages.map((msg) => {
              const isLoggedIn = msg.senderUser?.isLoggedInUser ?? false;
              const isGroupChat = selectedChat?.isGroupChat ?? false;

              return (
                <div
                  key={msg._id}
                  className={`flex items-end space-x-2 ${
                    isLoggedIn ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isLoggedIn && isGroupChat && (
                    <ProfileBox user={msg.senderUser} />
                  )}

                  <MessageField
                    msg={msg}
                    isGroupChat={isGroupChat}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              );
            })
          ) : (
            <p className='text-gray-500 dark:text-gray-400 text-center'>
              No messages yet.
            </p>
          )}
        </InfiniteScroll>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <InputMessageBox selectedChat={selectedChat} />
    </section>
  );
};

export default MessageList;
