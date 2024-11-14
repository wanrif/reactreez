import apiRequest from './request';

export const apiUrl = {
  login: '/api/starter/auth/login',
  refreshToken: '/api/starter/auth/refresh-token',
  getContacts: '/api/starter/chatting/contacts',
};

interface ICallApi {
  endpoint: string;
  method: string;
  data?: any;
  headers?: object;
  params?: object;
}

const callApi = async ({ endpoint, method, data, headers = {}, params = {} }: ICallApi) => {
  try {
    const response = await apiRequest.request({
      url: endpoint,
      method,
      data,
      headers,
      params,
    });
    const responseAPI = response.data && response.data.data;
    responseAPI.message = response.data && response.data.message;
    return responseAPI;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (data: any) => {
  return callApi({ endpoint: apiUrl.login, method: 'POST', data });
};

export const refreshToken = async (refreshToken: string) => {
  return callApi({ endpoint: apiUrl.refreshToken, method: 'POST', data: { refreshToken } });
};

export const getContacts = async () => {
  return callApi({ endpoint: apiUrl.getContacts, method: 'GET' });
};
