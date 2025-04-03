import { JSX, useEffect } from 'react';
import { useGetMyInformation } from '../../hooks';
import { authenticatedVar, excludedRoutes } from '..';

export const Guard = ({ children }: { children: JSX.Element }) => {
  const { user } = useGetMyInformation();

  useEffect(() => {
    if (user) {
      console.log('Setting authenticated to true...');
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};
