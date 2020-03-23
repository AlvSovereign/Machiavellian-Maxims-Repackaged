import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import { toggleModal } from 'store/slice/app';
import { RootStateInterface } from 'store/store';

const Header = ({}: HeaderProps) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootStateInterface) => state.app);

  return (
    <nav className='absolute top-0 w-full flex items-center justify-between flex-wrap bg-white p-6'>
      <Button
        onClick={() => dispatch(toggleModal({ showModal: !showModal }))}
        size='small'
        type='button'
        variant='outline'>
        {'Sign Up / Sign In'}
      </Button>
    </nav>
  );
};

export { Header };

interface HeaderProps {}
