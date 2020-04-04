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
      dispatch(fetchMaxim(maximNumber));
    }
  }, [location.pathname]);

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const getRandomMaxim = () => {
    history.push(`/maxim/${getRandomNumber(1, 290)}`);
  };

  const isSaved = savedMaxims.includes(maximNumber);
  const isLoggedIn = !!email;

  const navigateMaxims = (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 13:
        savedMaxims.includes(maximNumber)
          ? updateSavedMaxims(maximNumber)
          : updateSavedMaxims(maximNumber);
        break;
      case 32:
        dispatch(getRandomMaxim());
        break;
      case 37:
        dispatch(fetchMaxim(maximNumber - 1));
        break;
      case 39:
        dispatch(fetchMaxim(maximNumber + 1));
        break;
    }
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
      onKeyDown={e => navigateMaxims(e)}>
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
          onClick={() => dispatch(fetchMaxim(maximNumber - 1))}
          variant='default'>
          &#8592;
        </Button>
        <Button
          size='regular'
          onClick={() => getRandomMaxim()}
          type='button'
          variant='default'>
          {'Random Maxim'}
        </Button>
        <Button
          size='regular'
          type='button'
          onClick={() => dispatch(fetchMaxim(maximNumber + 1))}
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
