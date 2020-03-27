import React from 'react';
import clsx from 'clsx';
import { Typography, TypographyProps } from './Typography';

const Link = ({
  children,
  classes,
  font,
  href,
  onClick,
  variant
}: LinkProps) => {
  const clsxs = clsx(classes);

  return (
    <>
      {href ? (
        <Typography
          href={href}
          classes={clsxs}
          component='a'
          font={font}
          variant={variant}>
          {children}
        </Typography>
      ) : (
        <Typography
          component='span'
          classes={clsxs}
          font={font}
          onClick={onClick}
          variant={variant}>
          {children}
        </Typography>
      )}
    </>
  );
};

export { Link };

interface LinkProps extends TypographyProps {}
