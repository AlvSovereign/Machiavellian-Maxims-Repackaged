import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaxim } from 'store/slice/maxim';
import { RootStateInterface } from 'store/store';
import { MaximError } from 'components/MaximError';
import { Button } from 'components/Button';
import { Maxim } from 'components/Maxim';

const MaximPage = (props: MaximPageProps) => {
  const dispatch = useDispatch();
  const { currentMaxim, isError } = useSelector(
    (state: RootStateInterface) => state.maxim
  );
  const focusDiv: any = useRef(null);

  useEffect(() => {
    !currentMaxim && dispatch(fetchMaxim());
  }, []);

  useLayoutEffect(() => {
    focusDiv.current && focusDiv.current.focus();
  }, []);

  const navigateMaxims = (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 32:
        dispatch(fetchMaxim());
        break;
      case 37:
        dispatch(fetchMaxim('prev'));
        break;
      case 39:
        dispatch(fetchMaxim('next'));
        break;
    }
  };

  return (
    <div
      ref={focusDiv}
      tabIndex={1}
      className={'h-screen w-screen flex flex-col items-center justify-center'}
      onKeyDown={e => navigateMaxims(e)}>
      {isError || currentMaxim.maximNumber === 0 ? (
        <MaximError />
      ) : (
        <Maxim data={currentMaxim} />
      )}
      <div
        className='mx-auto flex flex-row items-center justify-around'
        style={{ width: '100%', maxWidth: 640 }}>
        <Button
          size='regular'
          type='button'
          onClick={() => dispatch(fetchMaxim('prev'))}
          variant='default'>
          &#8592;
        </Button>
        <Button
          size='regular'
          onClick={() => dispatch(fetchMaxim())}
          type='button'
          variant='default'>
          {'Random Maxim'}
        </Button>
        <Button
          size='regular'
          type='button'
          onClick={() => dispatch(fetchMaxim('next'))}
          variant='default'>
          &#8594;
        </Button>
      </div>
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
