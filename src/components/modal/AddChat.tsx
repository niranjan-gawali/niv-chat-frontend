import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { User } from '../../common';
import useCreateChat from '../../hooks/useCreateChat';

interface AddChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChat = ({ isOpen, onClose }: AddChatProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const { users } = useSearchUsers(debouncedSearchText);
  const { createChat, error, resetError } = useCreateChat();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSearchText('');
      setSelectedUser(undefined);
      resetError();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      createChat([selectedUser._id]);
      if (!error?.message) onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='relative w-full max-w-md sm:max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 flex flex-col'
        style={{ height: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-center text-xl font-bold text-gray-800 dark:text-white mb-4'>
          Create Chat
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col flex-grow space-y-4'
        >
          <input
            type='text'
            className='w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
            placeholder='Search users...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div
            className='border border-gray-200 dark:border-gray-700 rounded-md overflow-y-auto flex-grow bg-gray-50 dark:bg-gray-800'
            style={{ maxHeight: '250px' }}
          >
            {users && users.length > 0
              ? users.map((user) => (
                  <div
                    key={user._id}
                    className='px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-white'
                    onClick={() => {
                      setSearchText(user.firstName);
                      setSelectedUser(user as User);
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                ))
              : searchText && (
                  <div className='px-4 py-2 text-gray-500 dark:text-gray-400'>
                    No users found.
                  </div>
                )}
          </div>

          <div>
            <span className='text-sm text-red-600 dark:text-red-400 underline'>
              {error?.message}
            </span>
          </div>

          <div className='mt-auto'>
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md py-2 transition duration-200'
              disabled={!selectedUser}
            >
              Start chat{' '}
              {selectedUser?.firstName && `with ${selectedUser.firstName}`}
            </button>
          </div>
        </form>

        <button
          className='absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition cursor-pointer'
          onClick={onClose}
        >
          <span className='text-2xl'>&times;</span>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AddChat;
