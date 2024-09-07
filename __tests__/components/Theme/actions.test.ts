import { configureStore } from '@reduxjs/toolkit';
import reducer from '@app/reducer';
import { expect, test, vi } from 'vitest';
import { toggleTheme } from '@components/Theme/thunk';

const createTestStore = () => {
  return configureStore({
    reducer: {
      app: reducer,
    },
  });
};

test('setThemeWithCallbacks success', async () => {
  const store = createTestStore();

  const cbSuccess = vi.fn();

  await store.dispatch(toggleTheme({ theme: 'dark', cbSuccess }));

  const state = store.getState().app;

  expect(state.theme).toBe('dark');
  expect(cbSuccess).toHaveBeenCalled();
});

test('setThemeWithCallbacks failure', async () => {
  const store = createTestStore();

  const cbSuccess = vi.fn();
  const cbFailed = vi.fn();

  // Mock dispatch to throw an error inside the thunk
  vi.spyOn(store, 'dispatch').mockImplementationOnce(() => {
    throw new Error('Error setting theme');
  });

  try {
    await store.dispatch(
      toggleTheme({
        theme: 'dark',
        cbSuccess: () => document.documentElement.classList.toggle('dark'),
      })
    );
  } catch (_e) {
    // Handle the error
    cbFailed();
  }

  expect(cbSuccess).not.toHaveBeenCalled();
  expect(cbFailed).toHaveBeenCalled();
});
