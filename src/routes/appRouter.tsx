import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login, Signup, Home } from '../pages';

const appRouter = createBrowserRouter([
  { path: '/', element: <Navigate to='/login' replace /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/home',
    element: <Home />,
  },
]);

export default appRouter;
