import type { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text, onClick, className, type, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-4 bg-amber-500 dark:bg-amber-500
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-amber-600 focus:ring-amber-600 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg${
          className ? ' ' + className : ''
        }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
