import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Maxim } from '../../components/Maxim';
import { fetchMaxim } from '../../store/slice/maxim';
import { RootStateInterface } from '../../store/store';

const MaximPage = (props: MaximPageProps) => {
  const dispatch = useDispatch();
  const { currentMaxim } = useSelector(
    (state: RootStateInterface) => state.maxims
  );

  useEffect(() => {
    dispatch(fetchMaxim());
  }, []);

  return (
    <div
      className={'h-screen w-screen flex flex-col items-center justify-center'}>
      {currentMaxim && <Maxim data={currentMaxim} />}
      <div className='flex flex-row items-center justify-center'>
        <button type='button' onClick={() => dispatch(fetchMaxim('prev'))}>
          {'Previous Maxim'}
        </button>
        <button type='button' onClick={() => dispatch(fetchMaxim())}>
          {'Get Maxim'}
        </button>
        <button type='button' onClick={() => dispatch(fetchMaxim('next'))}>
          {'Next Maxim'}
        </button>
      </div>
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
