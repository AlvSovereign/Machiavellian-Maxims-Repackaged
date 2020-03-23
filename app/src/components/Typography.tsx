import React, { ReactNode } from 'react';
import clsx from 'clsx';

const Typography = ({
  children,
  classes,
  colour = 'black',
  component = 'p',
  href,
  variant
}: TypographyProps) => {
  const clsxs = clsx(
    'font-serif',
    {
      'text-gray-900': colour === 'black',
      'text-red-700': colour === 'red',
      'text-white': colour === 'white',
      'text-base': variant === 'button',
      'text-sm': variant === 'small',
      'text-xl md:text-2xl': variant === 'paragraph',
      'text-3xl md:text-4xl': variant === 'title'
    },
    classes
  );
  const Component = component;

  return (
    <Component href={href} target={href && 'blank_'} className={clsxs}>
      {children}
    </Component>
  );
};

export { Typography };

interface TypographyProps {
  children: ReactNode;
  colour?: 'red' | 'black' | 'white';
  component: any;
  classes?: string;
  href?: string;
  variant: 'small' | 'button' | 'title' | 'paragraph';
  props?: any;
}
