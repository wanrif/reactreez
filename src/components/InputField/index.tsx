import type { FC } from 'react';

interface InputFieldProps {
  autoFocus?: boolean;
  type: string;
  placeholder: string;
  name: string;
  register: any;
  error?: string;
  valueAsNumber?: boolean;
}

const InputField: FC<InputFieldProps> = ({ autoFocus, type, placeholder, name, register, error, valueAsNumber }) => {
  return (
    <div className='relative'>
      <input
        autoFocus={autoFocus}
        type={type}
        id={name}
        className='block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-primary-200 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-primary-50 dark:focus:ring-primary-50 text-slate-900 sm:text-sm focus:outline-none'
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        aria-invalid={error ? 'true' : 'false'}
      />
      {!!error && <p className='text-red-500 text-base'>{error}</p>}
    </div>
  );
};

export default InputField;
