import { User } from './user.interface';

export interface Message {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  senderUser: User;
}
