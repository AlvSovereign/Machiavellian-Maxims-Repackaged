import React from 'react';
import { MaximsSuccess } from 'services/api';
import { Typography } from './Typography';
import { MaximMarkdown } from './Markdown';
import { Bookmark, BookmarkOutline } from 'assets/icons';

const Maxim = ({ data, updateSavedMaxims, userLoggedIn }: MaximProps) => {
  const { _id, isSaved, maxim, maximNumber }: MaximsSuccess & IsSaved = data;

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        {userLoggedIn && (
          <div className='self-end'>
            {isSaved ? (
              <Bookmark onClick={() => updateSavedMaxims(_id, 'unsave')} />
            ) : (
              <BookmarkOutline onClick={() => updateSavedMaxims(_id, 'save')} />
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
  updateSavedMaxims: (maxim: string, type: 'save' | 'unsave') => void;
  userLoggedIn: boolean;
}

interface IsSaved {
  isSaved: boolean;
}
