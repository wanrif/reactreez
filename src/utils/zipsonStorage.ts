import { type WebStorage } from 'redux-persist';
import { parse, stringify } from 'zipson';

const createZipsonStorage = (baseStorage: WebStorage): WebStorage => {
  return {
    getItem: async (key: string) => {
      const data = await baseStorage.getItem(key);
      return data ? parse(data) : data;
    },
    setItem: async (key: string, value: any) => {
      await baseStorage.setItem(key, stringify(value));
    },
    removeItem: async (key: string) => {
      await baseStorage.removeItem(key);
    },
  };
};

export default createZipsonStorage;
