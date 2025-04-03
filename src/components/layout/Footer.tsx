const Footer = () => {
  return (
    <footer className='w-full bg-gray-100 dark:bg-gray-900 py-6 border-t border-gray-300 dark:border-gray-700'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-700 dark:text-gray-300'>
        {/* Left Section: Copyright */}
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} NivChat. All rights reserved.
        </p>

        {/* Center Section: Navigation Links */}
        <nav className='mt-4 md:mt-0'>
          <ul className='flex space-x-4'>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              Privacy Policy
            </li>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              Terms of Service
            </li>
            <li className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'>
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
