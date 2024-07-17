import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  theme: string;
  locale: string;
}

// Define the initial state using that type
const initialState: AppState = {
  theme: '',
  locale: 'en',
};

export const storedKeys = ['theme', 'locale'];

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export const { setTheme, setLocale } = appSlice.actions;

export default appSlice.reducer;
