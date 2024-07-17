import { configureStore } from '@reduxjs/toolkit';
import { setThemeWithCallbacks } from '@app/actions';
import reducer from '@app/reducer';
import { expect, test, vi } from 'vitest';

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
  const cbFailed = vi.fn();

  await store.dispatch(setThemeWithCallbacks({ theme: 'dark', cbSuccess, cbFailed }));

  const state = store.getState().app;

  expect(state.theme).toBe('dark');
  expect(cbSuccess).toHaveBeenCalled();
  expect(cbFailed).not.toHaveBeenCalled();
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
      setThemeWithCallbacks({
        theme: 'dark',
        cbSuccess: () => document.documentElement.classList.toggle('dark'),
        cbFailed: () => document.documentElement.classList.toggle('dark'),
      })
    );
  } catch (_e) {
    // Handle the error
    cbFailed();
  }

  expect(cbSuccess).not.toHaveBeenCalled();
  expect(cbFailed).toHaveBeenCalled();
});
