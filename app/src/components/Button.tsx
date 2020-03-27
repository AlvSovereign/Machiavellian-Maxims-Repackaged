import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Typography } from './Typography';
import { Loading } from 'assets/icons';
import styles from './Button.module.scss';

const Button = ({
  children,
  isDisabled,
  isLoading,
  onClick,
  size,
  type,
  width,
  variant
}: ButtonProps) => {
  const buttonClasses = clsx('font-normal rounded', {
    'w-full': width === 'full',
    'px-2 py-1': size === 'small',
    'px-4 py-2': size === 'regular',
    'bg-red-700 text-white': variant === 'default',
    'bg-transparent border border-red-700 hover:bg-red-200 text-red-700':
      variant === 'outline',
    'opacity-50 pointer-events-none cursor-not-allowed': isDisabled || isLoading
  });
  const typoClasses = clsx({
    'pr-2': isLoading
  });

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      <div className='flex flex-row items-center justify-center'>
        {isLoading ? (
          <Loading height={24} width={24} className={styles.spin} />
        ) : (
          <Typography
            colour={variant === 'default' ? 'white' : 'red'}
            classes={typoClasses}
            component='span'
            font='sans'
            variant={size === 'small' ? 'small' : 'button'}>
            {children}
          </Typography>
        )}
      </div>
    </button>
  );
};

export { Button };

interface ButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick: (event: React.MouseEvent) => void;
  size: 'small' | 'regular';
  type: 'button' | 'submit';
  width?: 'full';
  variant: 'default' | 'outline';
}
