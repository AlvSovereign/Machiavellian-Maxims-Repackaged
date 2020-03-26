import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from 'store/store';
import { toggleModal } from 'store/slice/app';
import { clearErrors } from 'store/slice/forms';
import { removeAllAlert } from 'store/slice/alert';

const Modal = ({ children }: ModalProps) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootStateInterface) => state.app);

  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      dispatch(toggleModal({ showModal: !showModal }));
      dispatch(clearErrors());
      dispatch(removeAllAlert());
    }
  };

  return (
    <>
      {showModal ? (
        <div
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          className='absolute top-0 left-0 z-50 h-screen w-screen flex flex-col items-center justify-center'
          onClick={event => handleClick(event)}>
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      ) : null}
    </>
  );
};

export { Modal };

interface ModalProps {
  children: ReactNode;
}

export interface SigninCredentials {
  email: string;
  password: string;
}
