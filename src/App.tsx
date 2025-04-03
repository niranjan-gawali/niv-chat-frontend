import './App.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/appRouter';
import { ApolloProvider } from '@apollo/client';
import client from './common/constants/apollo-client';
import { ToastProvider } from './components/elements';
import { Guard } from './common';

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastProvider />
      <Guard>
        <RouterProvider router={appRouter} />
      </Guard>
    </ApolloProvider>
  );
}

export default App;
