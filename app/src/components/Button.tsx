import React, { ReactNode } from 'react';
import { Typography } from './Typography';

const Button = ({ children, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      className='bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
      type={type}>
      <Typography colour='white' component='span' variant='button'>
        {children}
      </Typography>
    </button>
  );
};

export { Button };

interface ButtonProps {
  children: ReactNode;
  onClick: (event: React.MouseEvent) => void;
  type: 'button' | 'submit';
}
