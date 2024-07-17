import { type WebStorage } from 'redux-persist';
import LZString from 'lz-string';

const createLZStringStorage = (baseStorage: WebStorage): WebStorage => {
  return {
    getItem: async (key: string) => {
      const compressedItem = await baseStorage.getItem(key);
      if (compressedItem) {
        return LZString.decompressFromUTF16(compressedItem);
      }
      return compressedItem;
    },
    setItem: async (key: string, value: string) => {
      const compressedValue = LZString.compressToUTF16(value);
      await baseStorage.setItem(key, compressedValue);
    },
    removeItem: async (key: string) => {
      await baseStorage.removeItem(key);
    },
  };
};

export default createLZStringStorage;
