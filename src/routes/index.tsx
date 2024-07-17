// routes/index.tsx
import type React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '@routes/routes';

// Define a type for route elements
interface RouteElement {
  path: string;
  element: React.ReactNode;
  header?: boolean;
}

const ClientRoutes: React.FC = () => {
  // Helper function to generate route elements
  const generateRouteElements = (): RouteElement[] => {
    return routes.flatMap(({ path, layout: Layout, subRoutes, component: Component }) => {
      const routeElements: RouteElement[] = [];

      // Helper function to create an element
      const createElement = (
        Comp?: React.FC,
        LayoutComponent?: React.FC<{ children?: React.ReactNode; header?: boolean }>,
        header?: boolean
      ): React.ReactNode => {
        if (Comp) {
          if (LayoutComponent) {
            return (
              <LayoutComponent header={header}>
                <Comp />
              </LayoutComponent>
            );
          }
          return <Comp />;
        }
        return null; // Return null if Comp is undefined
      };

      // If there are subRoutes, generate route elements for them
      if (subRoutes && subRoutes.length > 0) {
        for (const { path: subRoutePath, component: SubComponent, layout: SubLayout, header } of subRoutes) {
          routeElements.push({
            path: `${path}${subRoutePath}`,
            element: createElement(SubComponent, SubLayout || Layout, header),
          });
        }
      } else {
        // Otherwise, generate a route element for the main route
        routeElements.push({
          path,
          element: createElement(Component, Layout),
        });
      }

      return routeElements;
    });
  };

  // Get the route elements
  const routeElements = generateRouteElements();

  return (
    <Routes>
      {routeElements.map(({ path, element }) => (
        <Route key={`route_${path}`} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default ClientRoutes;
