import { useState, useEffect, useRef, FormEvent } from 'react';
import { Menu } from 'lucide-react';
import { useGetChats } from '../../hooks';
import { useGetMessages } from '../../hooks/useGetMessages';
import { Chat } from '../../common';
import moment from 'moment';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import InfiniteScroll from 'react-infinite-scroller';

const MainLayout = () => {
  // Fetching the data
  const { chats } = useGetChats();
  const { getMessages, messages, totalMessageCount, hasMore, loading } =
    useGetMessages();
  const { createMessage } = useCreateMessage();

  const [otherUserName, setOtherUserName] = useState<string>('');

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [inputText, setInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('NIRRR');
  }, [messages]);

  // setting up first chat
  useEffect(() => {
    if (chats) {
      handleFetchMessages(chats[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChat || inputText.trim() === '') return;
    console.log(inputText);
    createMessage(selectedChat._id, inputText);
    setInputText('');
  };

  const handleFetchMessages = async (chatId: string) => {
    setPageNo(1); // Reset page number

    // Fetch messages after resetting state
    setTimeout(() => {
      getMessages(chatId, 1);
    }, 0);

    // Update selected chat
    const selectedChatData: Chat = chats.find((c) => c._id === chatId) || null;
    setSelectedChat(selectedChatData);

    if (selectedChatData && !selectedChatData.isGroupChat) {
      const otherUser = selectedChatData.users.find(
        (u) => !u.isLoggedInUser
      )?.firstName;
      setOtherUserName(otherUser ?? '');
    }
  };

  const handleLoadMore = async () => {
    console.log('handleLoadMore called...');
    if (loading || !hasMore) return;

    const nextPage = pageNo + 1;
    if (messages.length < totalMessageCount) {
      await getMessages(selectedChat?._id, nextPage);
      setPageNo(nextPage);
    }
  };

  return (
    <div className='max-w-7xl w-full mx-auto flex h-full rounded-lg shadow-md overflow-hidden'>
      {/* Sidebar (Hidden on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 transform shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:relative md:translate-x-0 md:w-1/4 md:min-w-[250px] overflow-y-auto`}
      >
        <h2 className='text-lg font-bold mb-4 dark:text-white'>Chats</h2>

        <ul className='space-y-2'>
          {chats &&
            chats.map((chat) => {
              const name = chat.isGroupChat ? chat.groupName : otherUserName;

              const profilePicture = chat.users?.find(
                (u) => !u.isLoggedInUser
              )?.profilePicture;

              const lastMessage = chat.lastMessage?.content || '';
              const lastMessageTime = chat.lastMessage?.createdAt
                ? moment(chat.lastMessage.createdAt).fromNow()
                : '';

              return (
                <li
                  key={chat._id}
                  className={`flex items-start p-2 rounded-md cursor-pointer transition-colors ${
                    selectedChat?._id === chat._id
                      ? 'bg-gray-200 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
                  }`}
                  onClick={() => {
                    handleFetchMessages(chat._id);
                    setSidebarOpen(false);
                  }}
                >
                  {/* Avatar */}
                  <div className='flex-shrink-0 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden'>
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        className='w-full h-full object-cover rounded-full'
                      />
                    ) : (
                      name?.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Chat Details */}
                  <div className='ml-3 min-w-0 flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-semibold truncate text-black'>
                        {name}
                      </p>
                      {lastMessageTime && (
                        <span className='text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap'>
                          {lastMessageTime}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 dark:text-gray-400 truncate'>
                      {lastMessage}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </aside>

      {/* Chat Window */}
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
        {/* Messages List (Scrollable) */}
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            useWindow={false} // Ensure it works in a scrollable div
            threshold={100} // Start loading earlier
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
                      <div className='flex flex-col items-center'>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                          {msg.senderUser?.firstName || 'Unknown'}
                        </span>
                        {msg.senderUser?.profilePicture ? (
                          <img
                            src={msg.senderUser.profilePicture}
                            alt='User'
                            className='w-8 h-8 rounded-full'
                          />
                        ) : (
                          <div className='w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full'>
                            {msg.senderUser?.firstName?.[0] || 'U'}
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      className={`p-2 rounded-lg max-w-[75%] flex flex-col ${
                        isLoggedIn
                          ? 'bg-blue-500 text-white self-end'
                          : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                      }`}
                    >
                      {isGroupChat && !isLoggedIn && (
                        <span className='text-xs font-semibold text-gray-800 dark:text-gray-300'>
                          {msg.senderUser?.firstName || 'Unknown'}
                        </span>
                      )}
                      <span>{msg.content}</span>
                      <span className='text-xs text-gray-600 dark:text-gray-400 self-end'>
                        {moment(msg.createdAt).format('hh:mm A')}
                      </span>
                    </div>
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
        {/* Input Field (Fixed at Bottom) */}
        {selectedChat && (
          <div className='p-2 border-t dark:border-gray-700 bg-white dark:bg-gray-800'>
            <form
              onSubmit={handleSendMessage}
              className='flex items-center space-x-2'
            >
              <input
                type='text'
                placeholder='Type a message...'
                className='flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && !e.shiftKey && handleSendMessage(e)
                }
              />
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-blue-600'
                type='submit'
                disabled={!inputText.trim()} // Disable button if input is empty
              >
                Send
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainLayout;
