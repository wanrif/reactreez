import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Toaster } from 'react-hot-toast';
import { setTheme } from '@app/reducer';
import { selectTheme } from '@app/selectors';
import ClientRoutes from '@routes/index';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

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
    <div className='antialiased scroll-smooth'>
      <ClientRoutes />
      <Toaster reverseOrder={false} />
    </div>
  );
};

export default App;
