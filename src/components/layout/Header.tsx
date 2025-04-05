import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Icons for menu & theme toggle
import { useLogout } from '../../hooks';
import { useNavigate } from 'react-router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const navigate = useNavigate();

  const { logout } = useLogout();

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode on mount if previously enabled
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
  }, [darkMode]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className='sticky top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <h1 className='text-xl font-bold dark:text-white'>NivChat</h1>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-6'>
          <ul className='flex space-x-6 text-gray-700 dark:text-gray-300'>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              User
            </li>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              Profile
            </li>
            <li
              className='hover:text-red-500 dark:hover:text-red-400 cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </nav>

        {/* Theme Toggle Button */}
        <button
          className='p-2 text-gray-700 dark:text-gray-300 cursor-pointer'
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className='md:hidden bg-white dark:bg-gray-900 shadow-md absolute w-full left-0 top-[60px]'>
          <ul className='flex flex-col text-center space-y-4 p-4 text-gray-700 dark:text-gray-300'>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              User
            </li>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              Profile
            </li>
            <li
              className='hover:text-red-500 dark:hover:text-red-400 cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
