import { FormEvent, useState } from 'react';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import { Chat } from '../../common';

interface InputMessageBoxProps {
  selectedChat?: Chat;
  pageNo: number;
}

const InputMessageBox = ({ selectedChat, pageNo }: InputMessageBoxProps) => {
  const [inputText, setInputText] = useState('');
  const { createMessage } = useCreateMessage();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChat || inputText.trim() === '') return;
    console.log(inputText);
    createMessage(selectedChat._id, inputText, pageNo);
    setInputText('');
  };

  return (
    <>
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
    </>
  );
};

export default InputMessageBox;
