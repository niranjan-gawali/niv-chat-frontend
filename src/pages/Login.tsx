import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { LoginDto } from '../common';
import { useLogin } from '../hooks';
import { toast } from 'react-toastify';

const Login = () => {
  const { login, error, setError } = useLogin();
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
      console.log(values);
      await login(values);
      toast.success('Login successful!', { autoClose: 2000 });

      navigate('/');
      setError(null);
      resetForm();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  if (error) {
    <h1>Error Occured !!!!</h1>;
  }

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
              disabled={isSubmitting}
              className='bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer'
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <div className='w-full flex justify-center mt-10 underline cursor-pointer'>
              <Link to='/signup' className=''>
                Signup
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(Login);
