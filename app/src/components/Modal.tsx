import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from 'store/store';
import { toggleModal } from 'store/slice/app';
import { userSignin } from 'store/slice/user';
import { Button } from './Button';

const Modal = ({}: ModalProps) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootStateInterface) => state.app);
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      dispatch(toggleModal({ showModal: !showModal }));
    }
  };

  const attemptLogin = () => {
    setLoading(true);
    dispatch(userSignin({ email, password }));
  };

  return (
    <>
      {showModal ? (
        <div
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          className='absolute top-0 left-0 z-50 h-screen w-screen flex flex-col items-center justify-center'
          onClick={event => handleClick(event)}>
          <div className='w-full max-w-xs'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='username'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  placeholder='Username'
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
                  className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='******************'
                  onBlur={(event: React.FormEvent<HTMLInputElement>) =>
                    setPassword(event.currentTarget.value)
                  }
                />
                <p className='text-red-500 text-xs italic'>
                  Please choose a password.
                </p>
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export { Modal };

interface ModalProps {}

export interface SigninCredentials {
  email: string;
  password: string;
}
