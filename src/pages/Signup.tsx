import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { SignupDto } from '../common';
import { useCreateUserMutation } from '../hooks/useCreateUser';
import { toast } from 'react-toastify';

const Signup = () => {
  const initialUserForm = new SignupDto();
  const [createUser, { loading, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  const userFormValidation = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Email should be in correct format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleForm = async (
    values: typeof initialUserForm,
    { resetForm }: FormikHelpers<typeof initialUserForm>
  ) => {
    const { data } = await createUser({
      variables: { createUserInput: values },
    });

    toast.success('Signup successful!', { autoClose: 2000 });
    console.log('User Created:', data?.createUser);
    navigate('/login');
    resetForm();
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
              Sign Up
            </h2>

            {/* First Name */}
            <div className='mb-5'>
              <label htmlFor='firstName' className='block text-white mb-1'>
                First Name
              </label>
              <Field
                type='text'
                name='firstName'
                id='firstName'
                className='w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-400 text-sm mt-1'
              />
            </div>

            {/* Last Name */}
            <div className='mb-5'>
              <label htmlFor='lastName' className='block text-white mb-1'>
                Last Name
              </label>
              <Field
                type='text'
                name='lastName'
                id='lastName'
                className='w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-400 text-sm mt-1'
              />
            </div>

            {/* Username */}
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

            {/* Email */}
            <div className='mb-5'>
              <label htmlFor='email' className='block text-white mb-1'>
                Email
              </label>
              <Field
                type='email'
                name='email'
                id='email'
                className='w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-400 text-sm mt-1'
              />
            </div>

            {/* Password */}
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

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmitting || loading}
              className='w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-md'
            >
              {isSubmitting || loading ? 'Signing up...' : 'Sign Up'}
            </button>

            {/* Error Display */}
            {error && (
              <div className='text-red-400 text-sm text-center mt-2'>
                {error.message}
              </div>
            )}

            {/* Link to Login */}
            <div className='mt-6 text-center text-white'>
              Already have an account?{' '}
              <Link to='/login' className='underline hover:text-blue-300'>
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(Signup);
