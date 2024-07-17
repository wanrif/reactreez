import { type Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import defaultStorage from 'redux-persist/lib/storage';
import createLZStringStorage from '@utils/LZStringStorage';
// import createZipsonStorage from '@utils/zipsonStorage';
// import createFastStorage from '@utils/fastStorage';

interface PersistConfig {
  key: string;
  storage: typeof storage;
  whitelist: string[];
}

interface ReducerWithWhitelist {
  reducer: Reducer;
  whitelist: string[];
}

// Create custom storage
const storage = createLZStringStorage(defaultStorage);
// const storage = createZipsonStorage(defaultStorage);
// const storage = createFastStorage(defaultStorage);

export const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

export const mapWithPersistor = (reducers: Record<string, ReducerWithWhitelist>): Record<string, Reducer> =>
  Object.entries(reducers)
    .map(([key, reducer]) => ({
      [key]: persistReducer(
        {
          key,
          storage,
          whitelist: reducer.whitelist,
        },
        reducer.reducer
      ),
    }))
    .reduce((obj, item) => Object.assign(obj, item), {});
