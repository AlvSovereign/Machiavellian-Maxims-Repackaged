import React, { ReactNode } from 'react';
import clsx from 'clsx';

const Typography = ({
  children,
  classes,
  colour = 'black',
  component = 'p',
  font,
  href,
  onClick,
  variant
}: TypographyProps) => {
  const clsxs = clsx(
    {
      'font-serif': font === 'serif',
      'font-sans': font === 'sans',
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
    <Component
      href={href}
      target={href && 'blank_'}
      className={clsxs}
      onClick={onClick}>
      {children}
    </Component>
  );
};

export { Typography };

export interface TypographyProps {
  children: ReactNode;
  colour?: 'red' | 'black' | 'white';
  component: any;
  classes?: string;
  font: 'sans' | 'serif';
  href?: string;
  onClick?: () => void;
  variant: 'small' | 'button' | 'title' | 'paragraph';
}
