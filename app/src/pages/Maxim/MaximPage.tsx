import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Maxim, MaximInterface } from '../../components/Maxim';
import { getRandomMaxim } from '../../store/slice/maxim';

const MaximPage = (props: MaximPageProps) => {
  const [currentMaxim, setCurrentMaxim] = React.useState<MaximInterface | null>(
    null
  );
  const dispatch = useDispatch();

  const getRandomNumber = (min: number, max: number) => {
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    return randomNumber;
  };

  const asyncGetRandomMaxim = async () => {
    const maximNumber = getRandomNumber(1, 290);
    const response: any = await fetch(
      `${process.env.REACT_APP_API_URL}/maxim/${maximNumber}`
    );

    if (response.ok) {
      const maxim = await response.json();
      dispatch(getRandomMaxim({ ...maxim.data }));
      setCurrentMaxim(maxim.data);
    }
  };

  useEffect(() => {
    asyncGetRandomMaxim();
  }, []);

  return (
    <div
      className={'h-screen w-screen flex flex-col items-center justify-center'}>
      {currentMaxim && <Maxim data={currentMaxim} />}
      <button type='button' onClick={() => asyncGetRandomMaxim()}>
        {'Get Maxim'}
      </button>
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
