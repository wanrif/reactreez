import type { RootState } from '@store/stores';

export const selectIsAuthenticated = (state: RootState) => state.login.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.login.access_token;
export const selectRefreshToken = (state: RootState) => state.login.refresh_token;
export const selectLoginLoading = (state: RootState) => state.login.isLoginLoading;
