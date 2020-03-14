import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Maxim } from '../../components/Maxim';
import { fetchMaxims } from '../../store/slice/maxim';
import { RootStateInterface } from '../../store/store';

const MaximPage = (props: MaximPageProps) => {
  const dispatch = useDispatch();
  const { currentMaxim } = useSelector(
    (state: RootStateInterface) => state.maxims
  );

  useEffect(() => {
    dispatch(fetchMaxims());
  }, []);

  return (
    <div
      className={'h-screen w-screen flex flex-col items-center justify-center'}>
      {currentMaxim && <Maxim data={currentMaxim} />}
      <button type='button' onClick={() => dispatch(fetchMaxims())}>
        {'Get Maxim'}
      </button>
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
