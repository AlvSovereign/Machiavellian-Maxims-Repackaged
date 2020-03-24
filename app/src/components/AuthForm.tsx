import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from 'store/slice/forms';
import { Button } from './Button';
import { RootStateInterface } from 'store/store';
import clsx from 'clsx';

const AuthForm = ({}: AuthFormProps) => {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { errorOccured, isError } = useSelector(
    (state: RootStateInterface) => state.forms.auth
  );

  const inputClsxs = clsx(
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
  );

  const attemptLogin = () => {
    setLoading(true);
    dispatch(userSignin({ email, password }));
  };

  useEffect(() => {
    isError && setLoading(false);
  }, [isError]);

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'>
          Email
        </label>
        <input
          className={inputClsxs}
          style={errorOccured === 'email' ? { borderColor: 'red' } : undefined}
          id='email'
          type='text'
          placeholder='Email'
          onBlur={(event: React.FormEvent<HTMLInputElement>) =>
            setEmail(event.currentTarget.value)
          }
        />
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'>
          Password
        </label>
        <input
          className={inputClsxs}
          style={
            errorOccured === 'password' ? { borderColor: 'red' } : undefined
          }
          id='password'
          type='password'
          placeholder='******************'
          onBlur={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword(event.currentTarget.value)
          }
        />
      </div>
      <div className='flex items-center justify-between'>
        <Button
          isDisabled={!email.length && !password.length}
          isLoading={loading}
          onClick={() => attemptLogin()}
          size='regular'
          type='button'
          variant='default'>
          {loading ? '...Loading' : 'Sign In'}
        </Button>
        <a
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          href='#'>
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export { AuthForm };

interface AuthFormProps {}
