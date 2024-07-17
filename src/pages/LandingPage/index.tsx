import { useTranslation } from 'react-i18next';

interface Props {
  headerHeight: number;
}

const LandingPage = ({ headerHeight }: Props) => {
  const { t } = useTranslation();
  return (
    <main
      style={{ minHeight: `calc(100dvh - ${headerHeight}px)` }}
      className='flex flex-col items-center justify-center'
    >
      <div className='text-2xl'>{t('welcome')}</div>
    </main>
  );
};

export default LandingPage;
