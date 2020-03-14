import React from 'react';
import { MaximInterface } from '../store/slice/maxim';

const Maxim = ({ data }: MaximProps) => {
  const { _id, maxim, maximNumber }: MaximInterface = data;

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='font-serif'>{`Maxim #${maximNumber}`}</h2>
      <p className='font-serif'>{`${maxim}`}</p>
    </div>
  );
};

export { Maxim };

interface MaximProps {
  data: MaximInterface;
}
