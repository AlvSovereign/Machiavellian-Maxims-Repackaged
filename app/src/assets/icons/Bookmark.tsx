import * as React from 'react';
import clsx from 'clsx';

const Bookmark = ({
  height = 48,
  isSelected = false,
  width = 48,
  ...rest
}: BookmarkProps) => {
  const clsxs = clsx({
    'text-red-700 fill-current': isSelected
  });

  return (
    <svg
      viewBox='0 0 24 24'
      width={width}
      height={height}
      className={clsxs}
      {...rest}>
      <path d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z' />
      <path d='M0 0h24v24H0z' fill='none' />
    </svg>
  );
};

export { Bookmark };

interface BookmarkProps {
  height?: number;
  isSelected?: boolean;
  width?: number;
  [key: string]: any;
}
