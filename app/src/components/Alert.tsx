import React from 'react';
import clsx from 'clsx';
import { AlertInterface, removeAlert } from 'store/slice/alert';
import { useDispatch } from 'react-redux';

const Alert = ({ alerts }: AlertProps) => {
  const dispatch = useDispatch();

  const renderAlerts = (alerts: AlertInterface[]) => {
    return alerts.map((alert, index) => {
      const { autoDismiss, id, message, type } = alert;
      const clsxs = clsx(
        'absolute right-0 m-4 px-4 py-2 rounded max-w-sm z-60',
        {
          'bg-red-700': type === 'error'
        }
      );

      return (
        <React.Fragment key={id}>
          {autoDismiss &&
            setTimeout(function() {
              dispatch(removeAlert({ id }));
            }, autoDismiss)}
          <div
            className={clsxs}
            style={{ bottom: index * 55 }}
            onClick={() => dispatch(removeAlert({ id }))}>
            {message}
          </div>
        </React.Fragment>
      );
    });
  };

  return <>{renderAlerts(alerts)}</>;
};

export { Alert };

interface AlertProps {
  alerts: AlertInterface[];
}
