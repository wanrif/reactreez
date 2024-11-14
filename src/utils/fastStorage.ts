import stringify from 'fast-json-stable-stringify';
import { type WebStorage } from 'redux-persist';

const createFastStorage = (baseStorage: WebStorage): WebStorage => {
  return {
    getItem: async (key: string) => {
      const compressedItem = await baseStorage.getItem(key);
      if (compressedItem) {
        return JSON.parse(compressedItem);
      }
      return compressedItem;
    },
    setItem: async (key: string, value: string) => {
      const compressedValue = stringify(value);
      await baseStorage.setItem(key, compressedValue);
    },
    removeItem: async (key: string) => {
      await baseStorage.removeItem(key);
    },
  };
};

export default createFastStorage;
