import './App.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/appRouter';
import { ApolloProvider } from '@apollo/client';
import client from './common/constants/apollo-client';
import { ToastProvider } from './components/elements';
import { Guard } from './common';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastProvider />
        <Guard>
          <RouterProvider router={appRouter} />
        </Guard>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
