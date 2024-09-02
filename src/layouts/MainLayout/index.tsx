import { cloneElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import Navbar from '@components/Navbar';

export interface MainLayoutProps {
  children: ReactNode;
  header?: boolean;
}

const MainLayout = ({ children, header = false }: MainLayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current?.clientHeight]);

  return (
    <div className='flex flex-col min-h-screen bg-slate-50 dark:bg-primary-300 text-primary-200 dark:text-primary-50'>
      {header && <Navbar headerRef={headerRef} />}
      {cloneElement(children as ReactElement, { headerHeight })}
    </div>
  );
};

export default MainLayout;
