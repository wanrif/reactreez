import { loadable } from '@utils/loadable';
import React, { lazy } from 'react';

const MainLayout = lazy(() => import('@layouts/MainLayout'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const Login = lazy(() => import('@pages/Login'));
const NotFound = lazy(() => import('@pages/NotFound'));

type ComponentType = React.ComponentType<any>;

interface RouteConfig {
  path: string;
  name: string;
  protected?: boolean;
  component?: ComponentType;
  subRoutes?: RouteConfig[];
  layout?: ComponentType;
  header?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main Layout',
    protected: false,
    layout: loadable(MainLayout),
    subRoutes: [
      {
        path: '/',
        name: 'Landing Page',
        component: loadable(LandingPage),
        header: true,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login Page',
    protected: false,
    component: loadable(Login),
  },
  {
    path: '*',
    name: 'Not Found',
    protected: false,
    component: loadable(NotFound),
  },
];

export default routes;
