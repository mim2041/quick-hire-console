import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../core/store/store';

// Base selectors
const selectAuthState = (state: RootState) => state.auth;

// Derived selectors
export const selectUser = createSelector(
    [selectAuthState],
    (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
    [selectAuthState],
    (auth) => auth.isAuthenticated
);

export const selectAccessToken = createSelector(
    [selectAuthState],
    (auth) => auth.tokens.accessToken
);

export const selectRefreshToken = createSelector(
    [selectAuthState],
    (auth) => auth.tokens.refreshToken
);

export const selectUserRole = createSelector(
    [selectUser],
    (user) => user?.role
);

export const selectUserEmail = createSelector(
    [selectUser],
    (user) => user?.email
);

export const selectUserName = createSelector(
    [selectUser],
    (user) => user?.name || null
);





export const selectIsLoading = createSelector(
    [selectAuthState],
    (auth) => auth.isLoading
);

export const selectError = createSelector(
    [selectAuthState],
    (auth) => auth.error
);



