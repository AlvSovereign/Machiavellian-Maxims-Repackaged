import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import { toggleModal } from 'store/slice/app';
import { userSignOut } from 'store/slice/forms';
import { RootStateInterface } from 'store/store';

const Header = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootStateInterface) => state.app);
  const { email } = useSelector((state: RootStateInterface) => state.me);

  return (
    <nav className='absolute top-0 w-full flex items-center justify-between flex-wrap bg-white p-6'>
      {email ? (
        <Button
          onClick={() => dispatch(userSignOut())}
          size='small'
          type='button'
          variant='outline'>
          {'Sign Out'}
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(toggleModal({ showModal: !showModal }))}
          size='small'
          type='button'
          variant='outline'>
          {'Sign Up / Sign In'}
        </Button>
      )}
    </nav>
  );
};

export { Header };
