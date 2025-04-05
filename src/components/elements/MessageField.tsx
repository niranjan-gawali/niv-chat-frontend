import moment from 'moment';
import { Message } from '../../common';

interface MessageFieldPropsInterface {
  msg: Message;
  isGroupChat: boolean;
  isLoggedIn: boolean;
}

const MessageField = ({
  msg,
  isGroupChat,
  isLoggedIn,
}: MessageFieldPropsInterface) => {
  return (
    <>
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
        <span
          className={`text-xs  dark:text-gray-400 self-end ${
            isLoggedIn ? 'text-white' : 'text-gray-600'
          }`}
        >
          {moment(msg.createdAt).format('hh:mm A')}
        </span>
      </div>
    </>
  );
};

export default MessageField;
