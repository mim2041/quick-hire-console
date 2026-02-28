/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform, type PersistConfig } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist/es/constants';
import { rootReducer } from './rootReducer';
import { ENV } from '../../config/env';

// Environment validation
const isDevelopment = ENV.NODE_ENV === "development";
const secretKey = ENV.REDUX_PERSIST_SECRET;


if (!secretKey && !isDevelopment) {
    console.warn('VITE_REDUX_PERSIST_SECRET is not set. Using default key (not recommended for production)');
}

// Only persist stable/auth-critical fields from the auth slice
const authTransform = createTransform(
    // transform state on its way to being serialized and persisted
    (inboundState: any) => {
        if (!inboundState) return inboundState;
        return {
            user: inboundState.user,
            isAuthenticated: inboundState.isAuthenticated,
            tokens: inboundState.tokens,

        };
    },
    // transform state being rehydrated
    (outboundState: any) => {
        if (!outboundState) return outboundState;
        return {
            ...outboundState,
            // ensure volatile flags are clean on boot
            isLoading: false,
            error: null,
        };
    },
    { whitelist: ['auth'] }
);

// Encryption configuration with better error handling
const encryptor = encryptTransform({
    secretKey: secretKey || 'your-secret-key-change-in-production',
    onError: (error) => {
        console.error('Redux Persist encryption error:', error);
        // Clear persisted state on encryption error to recover from corruption
        try {
            storage.removeItem('persist:dod-dashboard-root');
        } catch {
            // ignore
        }
    },
});

// Enhanced persist configuration
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: 'dod-dashboard-root',
    version: 2, // bump version to trigger migration
    storage,
    timeout: 10000, // 10 seconds timeout
    transforms: [authTransform, encryptor],
    whitelist: ['auth', 'user', 'theme'], // Only persist these reducers
    blacklist: ['ui', 'loading'], // Don't persist UI state and loading states
    migrate: (state: any) => {
        try {
            if (!state) return Promise.resolve(state);
            // sanitize legacy persisted auth state
            if (state.auth) {
                const auth = state.auth as any;
                // drop volatile flags
                delete auth.isLoading;
                delete auth.error;
                // ✅ Ensure onboardingData structure exists to prevent undefined errors
                if (!auth.onboardingData) {
                    auth.onboardingData = {
                        personalData: null,
                        passwordData: null,
                        companyData: null,
                    };
                }
            }
            return Promise.resolve(state);
        } catch (e) {
            console.error('Persist migration failed, clearing storage', e);
            try {
                storage.removeItem('persist:dod-dashboard-root');
            } catch {
                // ignore error
            }
            return Promise.resolve(undefined as any);
        }
    },
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Enhanced store configuration
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: isDevelopment,
    preloadedState: undefined,
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;