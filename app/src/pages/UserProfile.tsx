import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'components/Typography';
import { RootStateInterface } from 'store/store';

const UserProfile = ({}: UserProfileProps) => {
  const dispatch = useDispatch();
  // const { getSavedMaxims } = useSelector(
  //   (state: RootStateInterface) => state.maxim
  // );
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className={'max-w-3xl mx-auto flex justify-between'}>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          font='serif'
          variant='title'>
          {'Saved Maxims'}
        </Typography>
        {}
      </div>
    </div>
  );
};

export { UserProfile };

interface UserProfileProps {}
