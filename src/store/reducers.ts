import { combineReducers, type Action, type Reducer } from '@reduxjs/toolkit';
import { mapWithPersistor } from './persistence';
import AppReducer, { appApi, storedKeys as storedAppState } from '@app/reducer';
import LoginReducer, { loginApi, storedKeys as storedLoginState } from '@pages/Login/reducer';

const storedReducers = {
  app: { reducer: AppReducer, whitelist: storedAppState },
  login: { reducer: LoginReducer, whitelist: storedLoginState },
};

const temporaryReducers: Record<string, Reducer> = {
  // Add temporary reducers here
  // app: AppReducer,
};

const apiReducers: Record<string, Reducer> = {
  // Add api reducers here
  [appApi.reducerPath]: appApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
};

export default function createReducer(injectedReducer: Record<string, Reducer> = {}): Reducer {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
    ...apiReducers,
    ...injectedReducer,
  });

  const rootReducer: Reducer = (state: ReturnType<typeof coreReducer> | undefined, action: Action) =>
    coreReducer(state, action);

  return rootReducer;
}
