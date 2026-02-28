/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, LoginResponse } from '../types/auth.types';
import { authService } from '../services/authService';

// Initialize state - simplified for login-only flow
const initialState: AuthState = {
    // User
    user: null,

    // Authentication Status
    isAuthenticated: false,

    // Tokens
    tokens: {
        accessToken: null,
        refreshToken: null,
    },

    // UI State
    isLoading: false,
    error: null,
};

// Async thunks - simplified to only include login
export const login = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Clear all auth state
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.tokens = {
                accessToken: null,
                refreshToken: null,
            };
            state.error = null;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;

                const data = action.payload;

                state.tokens.accessToken = data.accessToken ?? null;
                state.tokens.refreshToken = data.refreshToken ?? null;

                if (data.user) {
                    state.user = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: (data.user.role || 'USER').toLowerCase(),
                        status: 'active',
                    };
                }

                state.isAuthenticated = Boolean(data.accessToken);

                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

    },
});

export const {
    logout,
    clearError,
    setLoading,
} = authSlice.actions;

export default authSlice.reducer; 