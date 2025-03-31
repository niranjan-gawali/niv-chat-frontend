import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Signup } from '../pages';

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

export default appRouter;
