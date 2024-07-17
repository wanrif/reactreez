import { useEffect, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

import { setThemeWithCallbacks } from '@app/actions';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setTheme } from '@app/reducer';
import { selectTheme } from '@app/selectors';

const Theme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(
      setThemeWithCallbacks({
        theme: newTheme,
        cbSuccess: () => document.documentElement.classList.toggle('dark'),
      })
    );
  }, [theme]);

  useEffect(() => {
    if (theme === 'dark' || (isEmpty(theme) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      dispatch(setTheme('dark'));
      document.documentElement.classList.add('dark');
    } else {
      dispatch(setTheme('light'));
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className='flex items-center gap-2'>
      <button type='button' onClick={toggleTheme}>
        {theme === 'dark' ? <BsFillMoonStarsFill /> : <BsSunFill />}
      </button>
    </div>
  );
};

export default Theme;
