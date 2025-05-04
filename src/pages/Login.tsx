import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { LoginDto } from '../common';
import { useLogin } from '../hooks';
import { toast } from 'react-toastify';

const Login = () => {
  const { login, setError } = useLogin();
  const navigate = useNavigate();

  const initialUserForm = new LoginDto();

  const userFormValidation = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleForm = async (
    values: typeof initialUserForm,
    { resetForm }: FormikHelpers<typeof initialUserForm>
  ) => {
    try {
      await login(values);
      toast.success('Login successful!', { autoClose: 2000 });

      navigate('/home');
      setError(null);
      resetForm();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center relative login-bg'>
      <div className='absolute inset-0 bg-black opacity-60'></div>

      <Formik
        initialValues={initialUserForm}
        validationSchema={userFormValidation}
        onSubmit={handleForm}
      >
        {({ isSubmitting }) => (
          <Form className='z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md w-full dark:bg-gray-800/30'>
            <h2 className='text-3xl font-semibold text-center text-white mb-6'>
              Login
            </h2>

            <div className='mb-5'>
              <label htmlFor='username' className='block text-white mb-1'>
                Username
              </label>
              <Field
                type='text'
                name='username'
                id='username'
                className='w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <ErrorMessage
                name='username'
                component='div'
                className='text-red-400 text-sm mt-1'
              />
            </div>

            <div className='mb-5'>
              <label htmlFor='password' className='block text-white mb-1'>
                Password
              </label>
              <Field
                type='password'
                name='password'
                id='password'
                className='w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-400 text-sm mt-1'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-md'
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className='mt-6 text-center text-white'>
              Don't have an account?{' '}
              <Link to='/signup' className='underline hover:text-blue-300'>
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(Login);
