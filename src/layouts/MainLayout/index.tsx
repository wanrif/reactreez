import { cloneElement, type ReactElement, type ReactNode } from 'react';
import Navbar from '@components/Navbar';

export interface MainLayoutProps {
  children: ReactNode;
  header?: boolean;
}

const MainLayout = ({ children, header = false }: MainLayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen bg-slate-50 dark:bg-primary-300 text-primary-200 dark:text-primary-50'>
      {header && <Navbar />}
      {cloneElement(children as ReactElement, {})}
    </div>
  );
};

export default MainLayout;
