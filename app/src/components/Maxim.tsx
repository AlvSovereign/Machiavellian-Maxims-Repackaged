import React from 'react';
import { MaximInterface } from '../store/slice/maxim';

const Maxim = ({ data }: MaximProps) => {
  const { maxim, maximNumber }: MaximInterface = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <h2 className='mb-4 font-serif text-3xl md:text-4xl text-red-700'>{`Maxim #${maximNumber}`}</h2>
        <blockquote className='mb-4 font-serif text-xl md:text-2xl'>{`${maxim}`}</blockquote>
        <h6 className='self-end font-serif text-right text-base md:text-xl uppercase text-red-700'>
          {'IllimitableMen.com'}
        </h6>
      </div>
    </div>
  );
};

export { Maxim };

interface MaximProps {
  data: MaximInterface;
}
