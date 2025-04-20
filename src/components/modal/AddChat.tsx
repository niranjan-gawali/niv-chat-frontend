import { useEffect, useState } from 'react';
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', debouncedSearchText);
    console.log(selectedUser);
    if (selectedUser) {
      createChat([selectedUser._id]);
      if (error?.message) {
        return;
      }

      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
      <div
        className='relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-6 flex flex-col'
        style={{ height: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-center text-xl font-semibold mb-4'>Create Chat</h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col flex-grow space-y-4'
        >
          <input
            type='text'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search users...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div
            className='border border-gray-200 rounded-md overflow-y-auto flex-grow'
            style={{ maxHeight: '250px' }}
          >
            {users && users.length > 0
              ? users.map((user) => (
                  <div
                    key={user._id}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setSearchText(user.firstName);
                      setSelectedUser(user as unknown as User);
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                ))
              : searchText && (
                  <div className='px-4 py-2 text-gray-500'>No users found.</div>
                )}
          </div>

          <div>
            <span className='text-sm text-red-600 underline'>
              {error && error?.message}
            </span>
          </div>

          <div className='mt-auto'>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition cursor-pointer'
            >
              <span>Start chat with {selectedUser?.firstName}</span>
            </button>
          </div>
        </form>

        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer'
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
