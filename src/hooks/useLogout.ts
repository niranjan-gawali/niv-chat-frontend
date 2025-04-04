import { useState } from 'react';
import client from '../common/constants/apollo-client';
import { API_URL } from '../common/constants/urls';
import axios from 'axios';

const useLogout = () => {
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setError(null);
      await client.refetchQueries({ include: 'active' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Credentials are not valid.');
      } else {
        setError('Unknown error occured !!');
      }
      return;
    }
  };

  return { logout, error, setError };
};

export { useLogout };
