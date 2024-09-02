import { useGetPingQuery } from '@app/reducer';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  headerHeight?: number;
}

const LandingPage = ({ headerHeight = 0 }: Props) => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetPingQuery({});

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <main
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      className='flex flex-col items-center justify-center'>
      <div className='text-4xl font-bold'>{t('welcome')}</div>
      <div className='text-2xl'>{isLoading ? 'loading...' : data?.message}</div>
    </main>
  );
};

export default LandingPage;
