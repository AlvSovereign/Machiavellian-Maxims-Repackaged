import React from 'react';
import { Typography } from './Typography';
import { MaximMarkdown } from './Markdown';
import { MaximsSuccess } from 'services/api';

const Card = ({ maxim, maximNumber }: CardProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <Typography
          classes='mb-4'
          colour='red'
          component='h4'
          font='serif'
          variant='title'>
          {`Maxim #${maximNumber}`}
        </Typography>
        <MaximMarkdown>{`${maxim}`}</MaximMarkdown>
      </div>
    </div>
  );
};

export { Card };

interface CardProps extends MaximsSuccess {}
