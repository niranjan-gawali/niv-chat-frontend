export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string | null;
  isLoggedInUser: boolean;
}
