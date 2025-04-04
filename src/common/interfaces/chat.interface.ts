import { LastMessage } from './last-message.interface';
import { User } from './user.interface';

export interface Chat {
  _id: string;
  groupName: string | null;
  groupAdmin: string | null;
  lastMessage: LastMessage | null;
  users: User[];
  isGroupChat: boolean;
}
