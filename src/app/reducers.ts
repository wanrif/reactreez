import { combineReducers, type Action, type Reducer } from '@reduxjs/toolkit';
import AppReducer, { storedKeys as storedAppState } from './reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: AppReducer, whitelist: storedAppState },
};

const temporaryReducers: Record<string, Reducer> = {
  // Add temporary reducers here
  // app: AppReducer,
};

export default function createReducer(injectedReducer: Record<string, Reducer> = {}): Reducer {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
    ...injectedReducer,
  });

  const rootReducer: Reducer = (state: ReturnType<typeof coreReducer> | undefined, action: Action) =>
    coreReducer(state, action);

  return rootReducer;
}
