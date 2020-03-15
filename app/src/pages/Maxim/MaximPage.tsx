import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Maxim } from '../../components/Maxim';
import { fetchMaxim } from '../../store/slice/maxim';
import { RootStateInterface } from '../../store/store';
import { MaximError } from '../../components/MaximError';

const MaximPage = (props: MaximPageProps) => {
  const dispatch = useDispatch();
  const { currentMaxim, isError } = useSelector(
    (state: RootStateInterface) => state.maxims
  );

  useEffect(() => {
    dispatch(fetchMaxim());
  }, []);

  return (
    <div
      className={'h-screen w-screen flex flex-col items-center justify-center'}>
      {isError || currentMaxim.maximNumber === 0 ? (
        <MaximError />
      ) : (
        <Maxim data={currentMaxim} />
      )}
      <div className='container mx-auto flex flex-row items-center justify-around'>
        <button
          type='button'
          className='bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded'
          onClick={() => dispatch(fetchMaxim('prev'))}>
          {'<-'}
        </button>
        <button type='button' onClick={() => dispatch(fetchMaxim())}>
          {'Random Maxim'}
        </button>
        <button
          type='button'
          className='bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded'
          onClick={() => dispatch(fetchMaxim('next'))}>
          {'->'}
        </button>
      </div>
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
