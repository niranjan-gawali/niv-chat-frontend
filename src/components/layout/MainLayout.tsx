import { useState, useEffect, useRef, FormEvent } from 'react';
import { Menu } from 'lucide-react';
import { useGetChats } from '../../hooks';
import { useGetMessages } from '../../hooks/useGetMessages';
import { Chat } from '../../common';
import moment from 'moment';

const MainLayout = () => {
  // Fetching the data
  const { chats } = useGetChats();
  const { messages, getMessages } = useGetMessages();
  console.log(chats);

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChat || inputText.trim() === '') return;
  };

  const handleFetchMessages = async (chatId: string) => {
    console.log(chatId);
    await getMessages(chatId);
    const selectedChatData = chats.filter((c) => c._id === chatId);

    setSelectedChat(selectedChatData[0]);
  };

  return (
    <div className='max-w-6xl w-full mx-auto flex h-full rounded-lg shadow-md overflow-hidden'>
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
              const name = chat.isGroupChat
                ? chat.groupName
                : chat.users?.find((u) => !u.isLoggedInUser)?.firstName;

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
                      ? 'bg-gray-50 text-white'
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
              ? selectedChat.isGroupChat === false
                ? `Group: ${selectedChat.groupName}`
                : `Chat with Niranjan`
              : 'Select a chat'}
          </h2>
        </div>
        {/* Messages List (Scrollable) */}
        {/* <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {messages?.length ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.senderUser?.isLoggedInUser
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {msg.content}
              </div>
            ))
          ) : (
            <p className='text-gray-500 dark:text-gray-400 text-center'>
              No messages yet.
            </p>
          )}
          <div ref={messagesEndRef} />
        </div> */}
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {messages?.length ? (
            messages.map((msg) => {
              const isLoggedIn = msg.senderUser?.isLoggedInUser;
              const isGroupChat = selectedChat?.isGroupChat; // Assuming `chat` is passed as a prop
              return (
                <div
                  key={msg._id}
                  className={`flex items-end space-x-2 ${
                    isLoggedIn ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Show profile image & name only in group chats */}
                  {!isLoggedIn && isGroupChat && (
                    <div className='flex flex-col items-center'>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {msg.senderUser?.firstName}
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

                  {/* Message Bubble */}
                  <div
                    className={`p-2 rounded-lg max-w-[75%] flex flex-col ${
                      isLoggedIn
                        ? 'bg-blue-500 text-white self-end'
                        : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    {isGroupChat && !isLoggedIn && (
                      <span className='text-xs font-semibold text-gray-800 dark:text-gray-300'>
                        {msg.senderUser?.firstName}
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
          <div ref={messagesEndRef} />
        </div>
        ;{/* Input Field (Fixed at Bottom) */}
        {selectedChat && (
          <div>
            <form
              onSubmit={handleSendMessage}
              className='p-2 border-t dark:border-gray-700 flex bg-white dark:bg-gray-800'
            >
              <input
                type='text'
                placeholder='Type a message...'
                className='flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'
                type='submit'
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
