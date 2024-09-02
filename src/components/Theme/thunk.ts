// thunk.ts
import { setTheme } from '@app/reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleTheme = createAsyncThunk(
  'theme/toggleTheme',
  async (payload: { theme: 'light' | 'dark'; cbSuccess?: () => void }, { dispatch }) => {
    if (payload.cbSuccess) {
      payload.cbSuccess();
    }
    return dispatch(setTheme(payload.theme));
  }
);
