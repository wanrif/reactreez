import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@store/configureStore';

interface AppState {
  theme: 'light' | 'dark' | string;
  locale: string;
}

const initialState: AppState = {
  theme: '',
  locale: 'en',
};

export const storedKeys = ['theme', 'locale'];

const selectAccessToken = (state: RootState) => state.login.access_token;

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env['VITE_API_URL'],
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState());
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPing: builder.query({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export const { useGetPingQuery } = appApi;

export const { setTheme, setLocale } = appSlice.actions;

export default appSlice.reducer;
