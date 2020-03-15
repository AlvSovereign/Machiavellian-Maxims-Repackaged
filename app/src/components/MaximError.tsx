import React from 'react';

const MaximError = ({}: MaximErrorProps) => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <h2 className='mb-4 font-serif text-3xl md:text-4xl text-red-700'>
          {'#404'}
        </h2>
        <blockquote className='mb-4 font-serif text-xl italic'>
          {'There was an error fetching this Maxim, please try again.'}
        </blockquote>
        <h6 className='self-end font-serif text-right text-base md:text-xl uppercase text-red-700'>
          {'IllimitableMen.com'}
        </h6>
      </div>
    </div>
  );
};

export { MaximError };

interface MaximErrorProps {}
