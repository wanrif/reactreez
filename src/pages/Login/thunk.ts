import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@service/api';

export const doLogin = createAsyncThunk(
  'login/doLogin',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);
