import React from 'react';
import clsx from 'clsx';

const Input = ({
  errorMessage,
  label,
  name,
  isError,
  onBlur,
  placeholder,
  type
}: InputProps) => {
  const inputClasses = clsx(
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline',
    { 'mb-2 border-red-700': isError }
  );

  const labelClasses = clsx('block text-gray-700 text-sm font-bold mb-2', {
    'text-red-700': isError
  });

  const errorMessageClasses =
    'inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800';

  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        id={name}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {isError && <p className={errorMessageClasses}>{errorMessage}</p>}
    </div>
  );
};

export { Input };

interface InputProps {
  errorMessage?: string;
  name: string;
  isError?: boolean;
  label?: string;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: 'password' | 'text';
}
