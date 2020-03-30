import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savedMaximsToUpdate, fetchMaxim } from 'store/slice/maxim';
import { RootStateInterface } from 'store/store';
import { MaximError } from 'components/MaximError';
import { Button } from 'components/Button';
import { Maxim } from 'components/Maxim';

const MaximPage = () => {
  const dispatch = useDispatch();
  const { currentMaxim, isError } = useSelector(
    (state: RootStateInterface) => state.maxim
  );
  const { email, savedMaxims } = useSelector(
    (state: RootStateInterface) => state.me
  );
  const focusDiv: any = useRef(null);

  useEffect(() => {
    !currentMaxim && dispatch(fetchMaxim());
  }, []);

  useLayoutEffect(() => {
    focusDiv.current && focusDiv.current.focus();
  }, []);

  const isSaved = savedMaxims.includes(currentMaxim._id);
  const userLoggedIn = !!email;

  const navigateMaxims = (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 13:
        savedMaxims.includes(currentMaxim._id)
          ? updateSavedMaxims(currentMaxim._id, 'unsave')
          : updateSavedMaxims(currentMaxim._id, 'save');
        break;
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

  const updateSavedMaxims = (maximId: string, type: 'save' | 'unsave') => {
    const isMatch = savedMaxims.includes(maximId);

    type === 'save'
      ? !isMatch && dispatch(savedMaximsToUpdate([...savedMaxims, maximId]))
      : isMatch &&
        dispatch(
          savedMaximsToUpdate(savedMaxims.filter(maxim => maxim !== maximId))
        );
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
        <Maxim
          data={{ ...currentMaxim, isSaved }}
          updateSavedMaxims={savedMaxims && updateSavedMaxims}
          userLoggedIn={userLoggedIn}
        />
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
