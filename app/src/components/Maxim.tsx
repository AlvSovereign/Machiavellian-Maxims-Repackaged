import React from 'react';
import { MaximInterface } from 'store/slice/maxim';
import { Typography } from './Typography';
import { MaximMarkdown } from './Markdown';

const Maxim = ({ data }: MaximProps) => {
  const { maxim, maximNumber }: MaximInterface = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          variant='title'>{`Maxim #${maximNumber}`}</Typography>
        <MaximMarkdown>{`${maxim}`}</MaximMarkdown>
        <Typography
          href='https://www.illimitablemen.com'
          classes='uppercase mb-4'
          colour='red'
          component='a'
          variant='paragraph'>
          {'IllimitableMen.com'}
        </Typography>
      </div>
    </div>
  );
};

export { Maxim };

interface MaximProps {
  data: MaximInterface;
}
