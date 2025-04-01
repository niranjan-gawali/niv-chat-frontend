import './App.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/appRouter';
import { ApolloProvider } from '@apollo/client';
import client from './common/constants/apollo-client';
import { ToastProvider } from './components/elements';

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <ToastProvider />
        <RouterProvider router={appRouter} />
      </>
    </ApolloProvider>
  );
}

export default App;
