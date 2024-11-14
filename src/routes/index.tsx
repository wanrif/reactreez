import { selectIsAuthenticated } from '@pages/Login/selectors';
import routes from '@routes/routes';
import { useAppSelector } from '@store/hooks';
import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface RouteElement {
  path: string;
  element: React.ReactNode;
  header?: boolean;
}

type ComponentType = React.ComponentType<any>;
type LayoutComponentType = React.ComponentType<{ children: React.ReactNode; header?: boolean }>;

const ClientRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = window.location.pathname;

  // Helper function to create an element
  const createElement = (
    Comp: ComponentType | undefined,
    isProtected?: boolean,
    LayoutComponent?: LayoutComponentType,
    header?: boolean
  ): React.ReactNode => {
    if (!Comp) return null;

    if (isProtected && !isAuthenticated) return <Navigate to='/login' state={{ from: location }} replace />;

    if (LayoutComponent) {
      return (
        <LayoutComponent header={header}>
          <Comp />
        </LayoutComponent>
      );
    }

    return <Comp />;
  };

  // Helper function to generate route elements
  const generateRouteElements = (): RouteElement[] =>
    routes.flatMap(({ path, protected: isProtected, layout: Layout, subRoutes, component: Component }) => {
      const routeElements: RouteElement[] = [];

      if (subRoutes && subRoutes.length > 0) {
        subRoutes.forEach(
          ({ path: subRoutePath, component: SubComponent, protected: subProtected, layout: SubLayout, header }) => {
            routeElements.push({
              path: `${path}${subRoutePath}`,
              element: createElement(SubComponent, subProtected || isProtected, SubLayout || Layout, header),
            });
          }
        );
      } else {
        routeElements.push({
          path,
          element: createElement(Component, isProtected, Layout),
        });
      }

      return routeElements;
    });

  // Memoize the route elements to prevent unnecessary re-renders
  const routeElements = useMemo(() => generateRouteElements(), [isAuthenticated]);

  return (
    <Routes>
      {routeElements.map(({ path, element }) => (
        <Route key={`route_${path}`} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default ClientRoutes;
