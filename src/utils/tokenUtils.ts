/**
 * Utility functions for JWT token management
 */

export interface TokenPayload {
    user_id: string;
    email: string;
    role?: string;
    organization_id?: string;
    type: 'auth' | 'refresh';
    timestamp: number;
    iat: number;
    exp: number;
}

/**
 * Parse JWT token and extract payload
 */
export const parseToken = (token: string): TokenPayload | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
    const payload = parseToken(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= currentTime;
};

/**
 * Get time until token expires (in seconds)
 */
export const getTimeUntilExpiry = (token: string): number => {
    const payload = parseToken(token);
    if (!payload) return 0;

    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - currentTime);
};

/**
 * Check if token needs refresh based on buffer time
 */
export const shouldRefreshToken = (token: string, bufferSeconds: number = 300): boolean => {
    const timeUntilExpiry = getTimeUntilExpiry(token);
    return timeUntilExpiry <= bufferSeconds;
};

/**
 * Get token expiration date
 */
export const getTokenExpirationDate = (token: string): Date | null => {
    const payload = parseToken(token);
    if (!payload) return null;

    return new Date(payload.exp * 1000);
};

/**
 * Format token expiration time for display
 */
export const formatTokenExpiration = (token: string): string => {
    const expirationDate = getTokenExpirationDate(token);
    if (!expirationDate) return 'Invalid token';

    return expirationDate.toLocaleString();
};

/**
 * Validate token structure
 */
export const isValidToken = (token: string): boolean => {
    if (!token || typeof token !== 'string') return false;

    const parts = token.split('.');
    if (parts.length !== 3) return false;

    try {
        const payload = parseToken(token);
        return payload !== null &&
            typeof payload === 'object' &&
            'exp' in payload &&
            'iat' in payload;
    } catch {
        return false;
    }
};

/**
 * Get token type (auth or refresh)
 */
export const getTokenType = (token: string): 'auth' | 'refresh' | null => {
    const payload = parseToken(token);
    return payload?.type || null;
};

/**
 * Check if token is an auth token
 */
export const isAuthToken = (token: string): boolean => {
    return getTokenType(token) === 'auth';
};

/**
 * Check if token is a refresh token
 */
export const isRefreshToken = (token: string): boolean => {
    return getTokenType(token) === 'refresh';
};
