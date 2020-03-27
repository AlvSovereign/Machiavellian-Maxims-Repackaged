import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, userSignin } from 'store/slice/forms';
import { Button } from './Button';
import { Input } from './Input';
import { RootStateInterface } from 'store/store';

const AuthForm = ({}: AuthFormProps) => {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formType, setFormType] = useState<'signin' | 'register'>('register');
  const dispatch = useDispatch();
  const { errorMessage, errorOccured, isError } = useSelector(
    (state: RootStateInterface) => state.forms.auth
  );

  const handleClick = () => {
    setLoading(true);
    if (formType === 'register') {
      dispatch(userRegister({ email, password }));
    } else {
      dispatch(userSignin({ email, password }));
    }
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
      <div className='flex flex-row items-center justify-between mb-4'>
        <a
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          href='#'>
          Forgot Password?
        </a>
        <a
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          onClick={() =>
            setFormType(formType === 'register' ? 'signin' : 'register')
          }>
          {formType === 'register' ? 'Or Sign In?' : 'Or Register?'}
        </a>
      </div>
      <div className='flex items-center justify-between'>
        <Button
          isDisabled={!email.length && !password.length}
          isLoading={loading}
          onClick={() => handleClick()}
          size='regular'
          type='button'
          width='full'
          variant='default'>
          {loading
            ? '...Loading'
            : formType === 'register'
            ? 'Register'
            : 'Sign In'}
        </Button>
      </div>
      <hr />
    </form>
  );
};

export { AuthForm };

interface AuthFormProps {}
