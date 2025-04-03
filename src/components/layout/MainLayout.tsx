import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
}

interface Chat {
  id: string;
  type: 'group' | 'user';
  name: string;
  messages: Message[];
}

const chats: Chat[] = [
  { id: 'g1', type: 'group', name: 'Work Team', messages: [] },
  { id: 'g2', type: 'group', name: 'Friends', messages: [] },
  { id: 'u1', type: 'user', name: 'Alice', messages: [] },
  { id: 'u2', type: 'user', name: 'Bob', messages: [] },
  { id: 'u3', type: 'user', name: 'Charlie', messages: [] },
];

const MainLayout = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (!selectedChat || inputText.trim() === '') return;

    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        { id: Date.now(), sender: 'me', text: inputText },
      ],
    };

    setSelectedChat(updatedChat);
    setInputText('');
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
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`cursor-pointer p-2 rounded-md ${
                selectedChat?.id === chat.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white'
              }`}
              onClick={() => {
                setSelectedChat(chat);
                setSidebarOpen(false); // Close sidebar on mobile
              }}
            >
              {chat.type === 'group' ? `📌 ${chat.name}` : `💬 ${chat.name}`}
            </li>
          ))}
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
              ? selectedChat.type === 'group'
                ? `Group: ${selectedChat.name}`
                : `Chat with ${selectedChat.name}`
              : 'Select a chat'}
          </h2>
        </div>

        {/* Messages List (Scrollable) */}
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {selectedChat?.messages.length ? (
            selectedChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <p className='text-gray-500 dark:text-gray-400 text-center'>
              No messages yet.
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field (Fixed at Bottom) */}
        {selectedChat && (
          <div className='p-2 border-t dark:border-gray-700 flex bg-white dark:bg-gray-800'>
            <input
              type='text'
              placeholder='Type a message...'
              className='flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainLayout;
