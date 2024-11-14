import Loader from '@components/Loader';
import React, { Suspense, type ComponentType, type ReactNode } from 'react';

interface LoadableOptions {
  fallback?: ReactNode;
}

export function loadable<T extends ComponentType<any>>(
  Component: T,
  { fallback = <Loader /> }: LoadableOptions = {}
): ComponentType<React.ComponentProps<T>> {
  return function LoadableComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}
