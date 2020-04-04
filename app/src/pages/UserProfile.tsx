import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { getSavedMaxims } from 'store/slice/maxim';
import { Card } from 'components/Card';
import { MaximMarkdown } from 'components/Markdown';

const UserProfile = ({}: UserProfileProps) => {
  const [userSavedMaxims, setUserSavedMaxims] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getMaxims();
  }, []);

  const getMaxims = async () => {
    const savedMaxims: any = await dispatch(getSavedMaxims());

    setUserSavedMaxims(savedMaxims);
  };

  return (
    <div className='h-screen w-screen flex flex-col pt-24'>
      <div className='max-w-3xl mx-auto'>
        <Typography
          classes='mb-4'
          colour='red'
          component='h2'
          font='serif'
          variant='title'>
          {'Saved Maxims'}
        </Typography>
      </div>
      <div className='max-w-3xl mx-auto flex flex-row flex-wrap overflow-scroll px-1'>
        {userSavedMaxims.map((maxim: any) => (
          <Card
            key={maxim._id}
            onClick={() => history.push(`/maxim/${maxim.maximNumber}`, maxim)}
            content={
              <MaximMarkdown isCard={true}>{`${maxim.maxim}`}</MaximMarkdown>
            }
            title={
              <Typography
                classes='mb-4'
                colour='red'
                component='h4'
                font='serif'
                variant='button'>
                {`Maxim #${maxim.maximNumber}`}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
};

export { UserProfile };

interface UserProfileProps {}
