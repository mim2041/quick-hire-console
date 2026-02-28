// Auth types aligned with QuickHire API
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

// Matches OpenAPI LoginResponse schema
export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

// Auth state for login-only flow
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  isLoading: boolean;
  error: string | null;
}