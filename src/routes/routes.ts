import React from 'react';

import MainLayout, { type MainLayoutProps } from '@layouts/MainLayout';
import LandingPage from '@pages/LandingPage';
import NotFound from '@pages/NotFound';

// Define a type for your route
interface RouteConfig {
  path: string;
  name?: string;
  protected: boolean;
  component?: React.FC;
  subRoutes?: RouteConfig[];
  layout?: React.FC<MainLayoutProps>;
  header?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    protected: false,
    layout: MainLayout,
    subRoutes: [
      {
        path: '/',
        name: 'Landing Page',
        protected: false,
        component: LandingPage,
        header: true,
      },
    ],
  },
  {
    path: '*',
    name: 'Not Found',
    protected: false,
    component: NotFound,
  },
];

export default routes;
