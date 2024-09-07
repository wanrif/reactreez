import { useCallback } from 'react';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectTheme } from '@app/selectors';
import { toggleTheme } from './thunk';

const Theme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(
      toggleTheme({
        theme: newTheme,
        cbSuccess: () => document.documentElement.classList.toggle('dark'),
      })
    );
  }, [theme]);

  return (
    <div className='flex items-center gap-2' data-testid='theme-toggle'>
      <button type='button' onClick={handleTheme} aria-label='toggleTheme'>
        {theme === 'dark' ? <BsFillMoonStarsFill /> : <BsSunFill />}
      </button>
    </div>
  );
};

export default Theme;
