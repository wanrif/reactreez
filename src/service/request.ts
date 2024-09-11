import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import store from '@store/configureStore';
import { selectRefreshToken, selectAccessToken } from '@pages/Login/selectors';
import { loggedIn, loggedOut } from '@pages/Login/reducer';
import { selectLocale } from '@app/selectors';
import { apiUrl } from './api';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

const apiRequest = axios.create({
  baseURL: import.meta.env['VITE_API_URL'],
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshTokenRequest = async () => {
  const accessToken = selectAccessToken(store.getState());
  const refreshToken = selectRefreshToken(store.getState());
  try {
    const response = await apiRequest.post(apiUrl.refreshToken, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': `Bearer ${refreshToken}`,
      },
    });
    const { access_token, refresh_token } = response.data.data;
    store.dispatch(loggedIn({ access_token, refresh_token }));
    return access_token;
  } catch (_error) {
    store.dispatch(loggedOut());
    return null;
  }
};

apiRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = selectAccessToken(store.getState());
    const locale = selectLocale(store.getState());

    config.headers = config.headers || {};
    config.headers['Accept'] = 'application/json';
    config.headers['language'] = locale;

    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiRequest.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'INVALID_ACCESS_TOKEN' &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return apiRequest(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenRequest();
        if (newToken) {
          processQueue(null, newToken);
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return apiRequest(originalRequest);
        } else {
          processQueue(error, null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
