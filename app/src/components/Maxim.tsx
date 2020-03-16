import React from 'react';
import { MaximInterface } from '../store/slice/maxim';
import { Typography } from './Typography';
import { Markdown } from './Markdown';

const Maxim = ({ data }: MaximProps) => {
  const { maxim, maximNumber }: MaximInterface = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <Markdown>{`Maxim #${maximNumber}`}</Markdown>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          variant='title'>{`Maxim #${maximNumber}`}</Typography>
        <Typography
          classes='mb-4'
          colour='black'
          component='blockquote'
          variant='paragraph'>{`${maxim}`}</Typography>
        <h6 className='font-serif text-base md:text-xl uppercase text-red-700'>
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
