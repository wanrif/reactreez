import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ILoginState {
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
  isLoginLoading: boolean;
}

const initialState: ILoginState = {
  email: '',
  password: '',
  access_token: '',
  refresh_token: '',
  isAuthenticated: false,
  isLoginLoading: false,
};

export const storedKeys = ['access_token', 'refresh_token', 'isAuthenticated'];

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env['VITE_API_URL']}/api/starter` }),
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoginLoading = action.payload;
    },
    loggedIn: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      if (state.access_token && state.refresh_token) {
        state.isAuthenticated = true;
      }
    },
    loggedOut: (state) => {
      state.access_token = '';
      state.refresh_token = '';
      state.isAuthenticated = false;
    },
  },
});

export const { usePostLoginMutation } = loginApi;

export const { setEmail, setPassword, setLoginLoading, loggedIn, loggedOut } = loginSlice.actions;

export default loginSlice.reducer;
