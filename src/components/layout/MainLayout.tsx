import { useState, useEffect, useRef } from 'react';
import { useGetChats } from '../../hooks';
import { useGetMessages } from '../../hooks/useGetMessages';
import { Chat } from '../../common';

import ChatList from '../sections/Chatlist';
import { MessageList } from '../sections';

const MainLayout = () => {
  // Fetching the data
  const { chats } = useGetChats();
  const { getMessages, messages, hasMore, loading } = useGetMessages();

  const [otherUserName, setOtherUserName] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // setting up first chat
  useEffect(() => {
    if (chats) {
      handleFetchMessages(chats[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  const handleFetchMessages = async (chatId: string) => {
    setPageNo(1); // Reset page number

    // Fetch messages after resetting state
    setTimeout(() => {
      getMessages(chatId, 1);
    }, 0);

    // Update selected chat
    const selectedChatData: Chat = chats.find((c) => c._id === chatId) as Chat;
    setSelectedChat(selectedChatData);

    if (selectedChatData && !selectedChatData.isGroupChat) {
      const otherUser = selectedChatData.users.find(
        (u) => !u.isLoggedInUser
      )?.firstName;
      setOtherUserName(otherUser ?? '');
    }
  };

  useEffect(() => {
    console.log('MainLayout', messages);
  }, []);

  return (
    <div className='max-w-7xl w-full mx-auto flex h-full rounded-lg shadow-md overflow-hidden'>
      {/* Sidebar (Hidden on Mobile) */}

      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        handleFetchMessages={handleFetchMessages}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Messages List (Scrollable) */}
      <MessageList
        selectedChat={selectedChat}
        messages={messages}
        hasMore={hasMore}
        loading={loading}
        getMessages={getMessages}
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
