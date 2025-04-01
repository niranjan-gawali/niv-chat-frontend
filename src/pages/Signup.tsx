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
    firstName: Yup.string().required('firstName is required'),
    lastName: Yup.string().required('firstName is required'),
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
    console.log('Form Submitted:', values);
    const { data } = await createUser({
      variables: { createUserInput: values },
    });

    toast.success('Signup successful!', { autoClose: 2000 });
    console.log('User Created:', data?.createUser);
    navigate('/login');

    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialUserForm}
        validationSchema={userFormValidation}
        onSubmit={handleForm}
      >
        {({ isSubmitting }) => (
          <Form className='max-w-md mx-auto mt-30 border rounded-2xl p-16'>
            <div className='relative z-0 w-full mb-5 group'>
              <Field
                type='text'
                name='firstName'
                id='firstName'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=''
                required
              />
              <label
                htmlFor='firstName'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                first name
              </label>
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <Field
                type='text'
                name='lastName'
                id='lastName'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=''
                required
              />
              <label
                htmlFor='lastName'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Last name
              </label>
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <Field
                type='email'
                name='email'
                id='email'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=''
                required
              />
              <label
                htmlFor='email'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Email
              </label>
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <Field
                type='text'
                name='username'
                id='username'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=''
                required
              />
              <label
                htmlFor='username'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Username
              </label>
              <ErrorMessage
                name='username'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <Field
                type='password'
                name='password'
                id='password'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required
              />
              <label
                htmlFor='password'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Password
              </label>
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting || loading}
              className='bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer'
            >
              {isSubmitting || loading ? 'Submitting...' : 'Submit'}
            </button>

            {error && (
              <div className='text-red-500 text-sm'>{error.message}</div>
            )}

            <div className='w-full flex justify-center mt-10 underline cursor-pointer'>
              <Link to='/login' className=''>
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(Signup);
