import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toUpper from 'lodash/toUpper';

import { useAppDispatch } from '@store/hooks';
import { setLocale } from '@app/reducer';

const Locale = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const switchLocale = useCallback(() => {
    const locales = i18n.languages;
    const currentLocale = i18n.language;
    const nextLocale = locales[(locales.indexOf(currentLocale) + 1) % locales.length];

    dispatch(setLocale(nextLocale));
    i18n.changeLanguage(nextLocale);
  }, [i18n.language]);

  return (
    <button type='button' className='font-medium cursor-pointer' onClick={switchLocale}>
      {toUpper(i18n.language)}
    </button>
  );
};

export default Locale;
