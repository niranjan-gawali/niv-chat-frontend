import { useState, useEffect, useRef } from 'react';
import { useGetChats } from '../../hooks';
import { useGetMessages } from '../../hooks/useGetMessages';
import { Chat } from '../../common';

import ChatList from '../sections/Chatlist';
import { MessageList } from '../sections';

const MainLayout = () => {
  const { chats, fetchOlderChats, searchChats, searchResult } = useGetChats();

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [otherUserName, setOtherUserName] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [debouncedSearchValue, debouncedSetSearchValue] = useState('');

  const selectedChatId = selectedChat?._id ?? '';
  const { messages, loading, fetchOlderMessages } =
    useGetMessages(selectedChatId);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (chats && chats.length > 0 && !selectedChat) {
      const firstChat = chats[0];
      setSelectedChat(firstChat as Chat);

      if (!firstChat.isGroupChat) {
        const otherUser = (firstChat as Chat).users.find(
          (u) => !u.isLoggedInUser
        )?.firstName;
        setOtherUserName(otherUser ?? '');
      }
    }
  }, [chats]);

  const handleFetchMessages = (chatId: string) => {
    const selected = chats.find((c) => c._id === chatId);
    if (!selected) return;

    setSelectedChat(selected as Chat);

    if (!selected.isGroupChat) {
      const otherUser = (selected as Chat).users.find(
        (u) => !u.isLoggedInUser
      )?.firstName;
      setOtherUserName(otherUser ?? '');
    }
  };

  useEffect(() => {
    searchChats(debouncedSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  return (
    <div className='max-w-7xl w-full mx-auto flex h-full rounded-lg shadow-md overflow-hidden'>
      <ChatList
        chats={
          debouncedSearchValue ? (searchResult as Chat[]) : (chats as Chat[])
        }
        selectedChat={selectedChat}
        handleFetchMessages={handleFetchMessages}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        fetchOlderChats={fetchOlderChats}
        debouncedSetSearchValue={debouncedSetSearchValue}
      />

      <MessageList
        selectedChat={selectedChat}
        messages={messages}
        loading={loading}
        fetchOlderMessages={fetchOlderMessages}
        otherUserName={otherUserName}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
};

export default MainLayout;
