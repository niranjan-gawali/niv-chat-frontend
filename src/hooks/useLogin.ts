import { useState } from 'react';
import client from '../common/constants/apollo-client';
import { LoginDto } from '../common';
import { API_URL } from '../common/constants/urls';
import axios from 'axios';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (request: LoginDto) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(res);

      setError(null);
      await client.refetchQueries({ include: 'active' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.status == 401) {
        setError('Credentials are not valid.');
      } else {
        setError('Unknown error occured !!');
      }
      return;
    }
  };

  return { login, error, setError };
};

export { useLogin };
