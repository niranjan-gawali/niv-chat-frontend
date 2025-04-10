import { useState, useEffect, useRef } from 'react';
import { useGetChats } from '../../hooks';
import { useGetMessages } from '../../hooks/useGetMessages';
import { Chat } from '../../common';

import ChatList from '../sections/Chatlist';
import { MessageList } from '../sections';

const MainLayout = () => {
  const { chats } = useGetChats();

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [otherUserName, setOtherUserName] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const selectedChatId = selectedChat?._id ?? '';
  const { messages, hasMore, loading } = useGetMessages(selectedChatId, pageNo);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Automatically select the first chat
  useEffect(() => {
    if (chats && chats.length > 0) {
      const firstChat = chats[0];
      setSelectedChat(firstChat);
      setPageNo(1);

      if (!firstChat.isGroupChat) {
        const otherUser = firstChat.users.find(
          (u) => !u.isLoggedInUser
        )?.firstName;
        setOtherUserName(otherUser ?? '');
      }
    }
  }, [chats]);

  const handleFetchMessages = (chatId: string) => {
    const selected = chats.find((c) => c._id === chatId);
    if (!selected) return;

    setSelectedChat(selected);
    setPageNo(1); // Reset pagination

    if (!selected.isGroupChat) {
      const otherUser = selected.users.find(
        (u) => !u.isLoggedInUser
      )?.firstName;
      setOtherUserName(otherUser ?? '');
    }
  };

  return (
    <div className='max-w-7xl w-full mx-auto flex h-full rounded-lg shadow-md overflow-hidden'>
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        handleFetchMessages={handleFetchMessages}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <MessageList
        selectedChat={selectedChat}
        messages={messages}
        hasMore={hasMore}
        loading={loading}
        getMessages={() => {}} // Not needed anymore — just pass empty function or remove this prop
        pageNo={pageNo}
        setPageNo={setPageNo}
        otherUserName={otherUserName}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
};

export default MainLayout;
