/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback, useState } from 'react';
import { Chat, Message } from '../../common';
import { Menu } from 'lucide-react';
import InputMessageBox from './InputMessageBox';
import { ProfileBox } from '../elements';
import MessageField from '../elements/MessageField';

interface MessageListProps {
  selectedChat?: Chat;
  messages: Message[];
  loading: boolean;
  fetchOlderMessages: () => void;
  otherUserName: string;
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const MessageList = ({
  selectedChat,
  messages,
  loading,
  fetchOlderMessages,
  otherUserName,
  setSidebarOpen,
  sidebarOpen,
}: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [prevHeight, setPrevHeight] = useState<number | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: initialScrollDone ? 'smooth' : 'auto',
      });
    }
    setInitialScrollDone(true);
  }, [messages]);

  useEffect(() => {
    // console.log('MESSAGE IS UPDATED...', [...messages]);

    if (prevHeight !== null && containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - prevHeight;
      setPrevHeight(null);
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || !selectedChat) return;

    if (container.scrollTop === 0) {
      const oldestMessage = messages[messages.length - 1];
      if (oldestMessage && oldestMessage._id) {
        setPrevHeight(container.scrollHeight);
        // console.log('LOADIN OLD DATA');
        fetchOlderMessages();
      }
    }
  }, [messages, loading, selectedChat, fetchOlderMessages]);

  return (
    <section className='flex-1 flex flex-col h-full bg-white dark:bg-gray-900 shadow-inner rounded-lg'>
      {/* Header */}
      <div className='p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='md:hidden text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded'
          aria-label='Toggle Sidebar'
        >
          <Menu size={24} />
        </button>
        <h2 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-white truncate max-w-xs'>
          {selectedChat
            ? selectedChat.isGroupChat
              ? `Group: ${selectedChat.groupName}`
              : `Chat with ${otherUserName}`
            : 'Select a chat'}
        </h2>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className='flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth'
      >
        {messages?.length > 0 ? (
          [...messages]
            .map((msg) => {
              const isLoggedIn = msg.senderUser?.isLoggedInUser ?? false;
              const isGroupChat = selectedChat?.isGroupChat ?? false;

              return (
                <div
                  key={msg._id}
                  className={`flex items-end ${
                    isLoggedIn ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Show profile icon if group chat and not logged in */}
                  {!isLoggedIn && isGroupChat && (
                    <div className='mr-2'>
                      <ProfileBox user={msg.senderUser} />
                    </div>
                  )}

                  <MessageField
                    msg={msg}
                    isGroupChat={isGroupChat}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              );
            })
            .reverse()
        ) : (
          <p className='text-gray-500 dark:text-gray-400 text-center mt-6'>
            No messages yet.
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className='p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
        <InputMessageBox selectedChat={selectedChat} />
      </div>
    </section>
  );
};

export default MessageList;
