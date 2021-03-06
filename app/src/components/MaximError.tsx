import React from 'react';
import { Typography } from './Typography';

const MaximError = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          font='serif'
          variant='title'>
          {'#404'}
        </Typography>
        <Typography
          classes='mb-4'
          colour='black'
          component='blockquote'
          font='serif'
          variant='paragraph'>
          {'There was an error fetching this Maxim, please try again.'}
        </Typography>
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

export { MaximError };
