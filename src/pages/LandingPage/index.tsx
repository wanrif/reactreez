import { useGetPingQuery } from '@app/reducer';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetPingQuery({});

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100dvh-60px)]'>
      <div className='text-4xl font-bold'>{t('welcome')}</div>
      <div className='text-2xl'>{isLoading ? 'loading...' : data?.message}</div>
    </main>
  );
};

export default LandingPage;
