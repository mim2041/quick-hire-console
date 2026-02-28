import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/store/authSlice';
// import userReducer from '../../features/user/store/userSlice';


export const rootReducer = combineReducers({
    auth: authReducer,
    // user: userReducer,
    // theme: themeReducer,
    // ui: uiReducer,
    // Add other feature reducers here
});

export type RootState = ReturnType<typeof rootReducer>;