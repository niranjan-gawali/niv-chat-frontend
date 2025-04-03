import { memo } from 'react';
import { Footer, Header, MainLayout } from '../components';

const Home = () => {
  return (
    <div className='flex flex-col h-screen dark:bg-gray-800'>
      {/* Header at the top */}
      <Header />

      {/* Main content takes full available space */}
      <main className='flex-1 overflow-auto mt-10'>
        <MainLayout />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default memo(Home);
