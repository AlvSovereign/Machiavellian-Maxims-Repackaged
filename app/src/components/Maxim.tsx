import React from 'react';
import { MaximsSuccess } from 'services/api';
import { Typography } from './Typography';
import { MaximMarkdown } from './Markdown';
import { Bookmark, BookmarkOutline } from 'assets/icons';

const Maxim = ({ data, updateSavedMaxims, isLoggedIn }: MaximProps) => {
  const { isSaved, maxim, maximNumber }: MaximsSuccess & IsSaved = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        {isLoggedIn && (
          <div className='self-end cursor-pointer'>
            {isSaved ? (
              <Bookmark
                height={36}
                isSelected={true}
                width={36}
                onClick={() => updateSavedMaxims(maximNumber)}
              />
            ) : (
              <BookmarkOutline
                height={36}
                width={36}
                onClick={() => updateSavedMaxims(maximNumber)}
              />
            )}
          </div>
        )}
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          font='serif'
          variant='title'>{`Maxim #${maximNumber}`}</Typography>
        <MaximMarkdown>{`${maxim}`}</MaximMarkdown>
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

export { Maxim };

interface MaximProps {
  data: MaximsSuccess & IsSaved;
  updateSavedMaxims: (maxim: number) => void;
  isLoggedIn: boolean;
}

interface IsSaved {
  isSaved: boolean;
}
