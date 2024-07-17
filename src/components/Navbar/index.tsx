import type { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Theme from '@components/Theme';
import Locale from '@components/Locale';

interface Props {
  headerRef: RefObject<HTMLDivElement>;
}

const Navbar = ({ headerRef }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      ref={headerRef}
      className='w-full bg-white shadow-sm dark:bg-primary-200 text-primary-200 dark:text-primary-50'
    >
      <div className='flex items-center container mx-auto justify-between  py-4 px-4 lg:px-28'>
        <div className='text-xl font-medium cursor-pointer' onClick={() => navigate('/')}>
          Navbar
        </div>
        <div className='flex items-center gap-4'>
          <button type='button' className='font-medium cursor-pointer' onClick={() => navigate('/')}>
            {t('navbar_home')}
          </button>
          <button type='button' className='font-medium cursor-pointer' onClick={() => navigate('/about')}>
            {t('navbar_about')}
          </button>
          <Theme />
          <Locale />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
