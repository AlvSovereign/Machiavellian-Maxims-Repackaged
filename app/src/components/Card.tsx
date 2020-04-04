import React, { ReactNode } from 'react';

const Card = ({ content, onClick, title }: CardProps) => {
  return (
    <div
      className='max-w-sm rounded px-6 py-4 bg-white overflow-hidden shadow-lg w-1/2 mb-2 cursor-pointer'
      onClick={onClick}>
      <>
        {title}
        {content}
      </>
    </div>
  );
};

export { Card };

interface CardProps {
  content: ReactNode;
  onClick?: () => void;
  title: ReactNode;
}
