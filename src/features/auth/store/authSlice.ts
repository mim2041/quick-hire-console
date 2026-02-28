/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials } from '../types/auth.types';
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
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
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

                const response = action.payload;
                const data = response?.data;

                if (data) {
                    state.tokens.accessToken = data.tokens?.accessToken ?? null;
                    state.tokens.refreshToken = data.tokens?.refreshToken ?? null;

                    if (data.user) {
                        state.user = {
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email,
                            role: (data.user.role || 'USER').toLowerCase(),
                            status: 'active',
                        };
                    }

                    state.isAuthenticated = Boolean(data.tokens?.accessToken);
                }

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