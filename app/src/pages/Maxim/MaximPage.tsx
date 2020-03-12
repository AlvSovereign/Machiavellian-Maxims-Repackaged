import React, { useEffect } from 'react';
import { Maxim, MaximInterface } from '../../components/Maxim';

const MaximPage = ({}: MaximPageProps) => {
  const [maxim, setMaxim] = React.useState<MaximInterface | null>(null);

  const getRandomNumber = (min: number, max: number) => {
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    return randomNumber;
  };

  const getRandomMaxim = async () => {
    const maximNumber = getRandomNumber(1, 290);
    const response: any = await fetch(
      `${process.env.REACT_APP_API_URL}/maxim/${maximNumber}`
    );
    console.log('response: ', response);

    if (response.ok) {
      const maxim = await response.json();
      setMaxim(maxim.data);
    }
  };

  useEffect(() => {
    getRandomMaxim();
  }, []);

  return (
    <div
      className={'h-screen w-screen flex flex-col items-center justify-center'}>
      {maxim && <Maxim data={maxim} />}
    </div>
  );
};

export { MaximPage };

interface MaximPageProps {}
