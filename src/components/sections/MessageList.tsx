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

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: initialScrollDone ? 'smooth' : 'auto',
      });
    }
    setInitialScrollDone(true);
  }, [messages]);

  // Maintain scroll position when older messages are loaded
  useEffect(() => {
    console.log('MESSAGE IS UPDATED...', [...messages]);

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
        console.log('LOADIN OLD DATA');
        fetchOlderMessages();
      }
    }
  }, [messages, loading, selectedChat, fetchOlderMessages]);

  return (
    <section className='flex-1 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg'>
      {/* Header */}
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

      {/* Messages */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className='flex-1 overflow-y-auto p-4 space-y-2'
      >
        {messages?.length > 0 ? (
          [...messages]
            .map((msg) => {
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
            .reverse()
        ) : (
          <p className='text-gray-500 dark:text-gray-400 text-center'>
            No messages yet.
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <InputMessageBox selectedChat={selectedChat} />
    </section>
  );
};

export default MessageList;
