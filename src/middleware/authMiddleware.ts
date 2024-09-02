import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@store/stores';
import { loggedOut } from '@pages/Login/reducer';

const authMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
  // Skip handling loggedOut action to avoid recursive dispatches
  if (loggedOut.match(action)) {
    return next(action);
  }

  const state = storeAPI.getState();
  const token = state.login.access_token;

  if (!token) {
    // Check if loggedOut is already being processed
    if (!state.authProcessing) {
      // Set a flag or dispatch an action to indicate that logout is in progress
      storeAPI.dispatch(loggedOut());
    }
    return next(action);
  }

  // Here you might want to validate the token if needed
  // Example: const validatedToken = JWT.verify(token);

  return next(action);
};

export default authMiddleware;
