// Simplified auth types for login-only flow
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

// API Response User type (matches actual API response)
export interface ApiUser {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember_me?: boolean;
}

export interface LoginResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
        user: ApiUser;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
    path: string;
}

// Simplified Auth State for login-only flow
export interface AuthState {
    // User
    user: User | null;

    // Authentication Status
    isAuthenticated: boolean;

    // Tokens
    tokens: {
        accessToken: string | null;
        refreshToken: string | null;
    };

    // UI State
    isLoading: boolean;
    error: string | null;
} 