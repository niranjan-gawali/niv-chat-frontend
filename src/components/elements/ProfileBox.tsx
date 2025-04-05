import { User } from '../../common';

interface ProfileBoxPropsInterface {
  user: User | null;
}

const ProfileBox = ({ user }: ProfileBoxPropsInterface) => {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-xs text-gray-500 dark:text-gray-400'>
        {user?.firstName || 'Unknown'}
      </span>
      {user?.profilePicture ? (
        <img
          src={user?.profilePicture}
          alt='User'
          className='w-8 h-8 rounded-full'
        />
      ) : (
        <div className='w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full'>
          {user?.firstName?.[0] || 'U'}
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
