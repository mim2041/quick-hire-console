import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';
import type {
    LoginCredentials,
    LoginResponse,
} from '../types/auth.types';

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        return api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    },
};
