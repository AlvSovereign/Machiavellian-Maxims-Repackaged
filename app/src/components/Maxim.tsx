import React from 'react';
import { MaximsSuccess } from 'services/api';
import { Typography } from './Typography';
import { MaximMarkdown } from './Markdown';

const Maxim = ({ data }: MaximProps) => {
  const { maxim, maximNumber }: MaximsSuccess = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          font='serif'
          variant='title'>{`Maxim #${maximNumber}`}</Typography>
        <MaximMarkdown>{`${maxim}`}</MaximMarkdown>
        <Typography
          href='https://www.illimitablemen.com'
          classes='uppercase mb-4'
          colour='red'
          component='a'
          font='serif'
          variant='paragraph'>
          {'IllimitableMen.com'}
        </Typography>
      </div>
    </div>
  );
};

export { Maxim };

interface MaximProps {
  data: MaximsSuccess;
}
