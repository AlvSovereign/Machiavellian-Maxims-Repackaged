import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from './Button';
import { toggleModal } from 'store/slice/app';
import { userSignOut } from 'store/slice/forms';
import { RootStateInterface } from 'store/store';
import { Profile } from 'assets/icons/Profile';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMatch = useRouteMatch('/user');
  const { showModal } = useSelector((state: RootStateInterface) => state.app);
  const { email } = useSelector((state: RootStateInterface) => state.me);

  return (
    <nav className='absolute top-0 w-full bg-white p-6'>
      <div className='max-w-3xl mx-auto flex items-center justify-between'>
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
        {email && (
          <Button
            isDisabled={!!isMatch}
            type='button'
            size='small'
            variant='plain'
            onClick={() => history.push('/user')}>
            <Profile height={36} width={36} isSelected={!!isMatch} />
          </Button>
        )}
      </div>
    </nav>
  );
};

export { Header };
