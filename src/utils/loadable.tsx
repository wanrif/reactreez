import React, { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

interface LoadableOptions {
  fallback?: ReactNode;
}

const loadable = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  { fallback = null }: LoadableOptions = {}
): ComponentType<any> => {
  const LazyComponent = lazy(importFunc);

  const LoadableComponent = (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export default loadable;
