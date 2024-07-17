import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTheme } from './reducer';

interface SetThemePayload {
  theme: string;
  cbSuccess?: () => void;
  cbFailed?: () => void;
}

export const setThemeWithCallbacks = createAsyncThunk(
  'app/setThemeWithCallbacks',
  async ({ theme, cbSuccess, cbFailed }: SetThemePayload, { dispatch }) => {
    try {
      dispatch(setTheme(theme));
      cbSuccess?.();
    } catch (_error) {
      cbFailed?.();
    }
  }
);
