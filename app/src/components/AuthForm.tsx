import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from 'store/slice/forms';
import { Button } from './Button';
import { Input } from './Input';
import { RootStateInterface } from 'store/store';

const AuthForm = ({}: AuthFormProps) => {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { errorMessage, errorOccured, isError } = useSelector(
    (state: RootStateInterface) => state.forms.auth
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
      <Input
        type='text'
        name='email'
        errorMessage={errorMessage}
        isError={isError && errorOccured === 'email'}
        label='Email'
        onBlur={(event: React.FormEvent<HTMLInputElement>) =>
          setEmail(event.currentTarget.value)
        }
        placeholder='Email'
      />
      <div className='mb-6'>
        <Input
          type='password'
          name='password'
          errorMessage={errorMessage}
          isError={isError && errorOccured === 'password'}
          label='Password'
          onBlur={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword(event.currentTarget.value)
          }
          placeholder='******************'
        />
        <a
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          href='#'>
          Forgot Password?
        </a>
      </div>
      <div className='flex items-center justify-between'>
        <Button
          isDisabled={!email.length && !password.length}
          isLoading={loading}
          onClick={() => attemptLogin()}
          size='regular'
          type='button'
          width='full'
          variant='default'>
          {loading ? '...Loading' : 'Sign In'}
        </Button>
      </div>
      <hr />
    </form>
  );
};

export { AuthForm };

interface AuthFormProps {}
