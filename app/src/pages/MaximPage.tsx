import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savedMaximsToUpdate, fetchMaxim } from 'store/slice/maxim';
import { RootStateInterface } from 'store/store';
import { MaximError } from 'components/MaximError';
import { Button } from 'components/Button';
import { Maxim } from 'components/Maxim';

const MaximPage = ({ location, match }: MaximProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { maxim } = useSelector((state: RootStateInterface) => state);
  const { isError } = maxim;
  const { email, savedMaxims } = useSelector(
    (state: RootStateInterface) => state.me
  );
  const focusDiv: any = useRef(null);
  const maximNumber = parseInt(match.params.maximNumber);
  const currentMaxim = maxim[maximNumber];

  useEffect(() => {
    if (location.state) {
      return;
    } else {
      if (maximNumber < 291) {
        dispatch(fetchMaxim(maximNumber));
      } else {
        history.push('/maxim-404');
      }
    }
  }, [location.pathname]);

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const isSaved = savedMaxims.includes(maximNumber);
  const isLoggedIn = !!email;

  const navigateMaxims = (event: any, maximNumber: number) => {
    let randomNumber;

    if (event?.keyCode) {
      switch (event.keyCode) {
        case 13:
          isLoggedIn && savedMaxims.includes(maximNumber)
            ? updateSavedMaxims(maximNumber)
            : updateSavedMaxims(maximNumber);
          break;
        case 32:
          randomNumber = getRandomNumber(1, 290);
          history.push(`/maxim-${randomNumber}`);
          break;
        case 37:
          dispatch(fetchMaxim(maximNumber - 1));
          return history.push(`/maxim-${maximNumber - 1}`);
        case 39:
          dispatch(fetchMaxim(maximNumber + 1));
          return history.push(`/maxim-${maximNumber + 1}`);
      }
    }

    history.push(`/maxim-${randomNumber || maximNumber}`);
  };

  const updateSavedMaxims = (maximNumber: number) => {
    isSaved
      ? dispatch(
          savedMaximsToUpdate(
            savedMaxims.filter(maxim => maxim !== maximNumber)
          )
        )
      : dispatch(savedMaximsToUpdate([...savedMaxims, maximNumber]));
  };

  const maximData = {
    ...location.state,
    ...currentMaxim,
    maximNumber,
    isSaved
  };

  useLayoutEffect(() => {
    focusDiv.current && focusDiv.current.focus();
  }, []);

  return (
    <div
      ref={focusDiv}
      tabIndex={1}
      className={'h-screen w-screen flex flex-col items-center justify-center'}
      onKeyDown={e => navigateMaxims(e, maximNumber)}>
      {isError ? (
        <MaximError />
      ) : (
        <Maxim
          data={maximData}
          updateSavedMaxims={updateSavedMaxims}
          isLoggedIn={isLoggedIn}
        />
      )}
      <div
        className='mx-auto flex flex-row items-center justify-around'
        style={{ width: '100%', maxWidth: 640 }}>
        <Button
          size='regular'
          type='button'
          onClick={e => navigateMaxims(e, maximNumber - 1)}
          variant='default'>
          &#8592;
        </Button>
        <Button
          size='regular'
          onClick={() => history.push(`/maxim-${getRandomNumber(1, 290)}`)}
          type='button'
          variant='default'>
          {'Random Maxim'}
        </Button>
        <Button
          size='regular'
          type='button'
          onClick={e => navigateMaxims(e, maximNumber + 1)}
          variant='default'>
          &#8594;
        </Button>
      </div>
    </div>
  );
};

export { MaximPage };

interface MaximProps {
  location: any;
  match: any;
}

interface MatchParams {
  maximNumber: number;
}
