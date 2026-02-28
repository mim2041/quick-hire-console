import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios';
import { store } from '../store/store';
import { logout } from '../../features/auth/store/authSlice';
import { routes } from '../../config/routes';
import { ENV } from '../../config/env';

// Simplified API Configuration
const API_BASE_URL = ENV.BASE_URL;
const API_TIMEOUT = 30000; // 30 seconds

// Simple request config type
interface SimpleAxiosRequestConfig extends AxiosRequestConfig {
    skipAuth?: boolean;
}

class RestAPI {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            timeout: API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Simple request interceptor
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = store.getState().auth.tokens.accessToken;
                const simpleConfig = config as InternalAxiosRequestConfig & SimpleAxiosRequestConfig;

                if (!simpleConfig.skipAuth && token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Simple response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async (error) => {
                // Handle 401 errors by logging out
                if (error.response?.status === 401) {
                    this.handleLogout();
                }

                return Promise.reject(error);
            }
        );
    }

    private handleLogout() {
        console.log('Logging out due to authentication failure');
        store.dispatch(logout());

        // Prevent infinite redirects
        if (window.location.pathname !== routes.auth.login) {
            window.location.href = routes.auth.login;
        }
    }

    // Simple HTTP methods
    get = <T = unknown>(url: string, config?: SimpleAxiosRequestConfig): Promise<T> =>
        this.axiosInstance.get(url, config).then((res) => res.data);

    post = <T = unknown>(url: string, payload?: unknown, config?: SimpleAxiosRequestConfig): Promise<T> =>
        this.axiosInstance.post(url, payload, config).then((res) => res.data);

    put = <T = unknown>(url: string, payload?: unknown, config?: SimpleAxiosRequestConfig): Promise<T> =>
        this.axiosInstance.put(url, payload, config).then((res) => res.data);

    patch = <T = unknown>(url: string, payload?: unknown, config?: SimpleAxiosRequestConfig): Promise<T> =>
        this.axiosInstance.patch(url, payload, config).then((res) => res.data);

    delete = <T = unknown>(url: string, config?: SimpleAxiosRequestConfig): Promise<T> =>
        this.axiosInstance.delete(url, config).then((res) => res.data);
}

// Create and export API instance
export const api = new RestAPI();
export const { get, post, put, patch, delete: deleteMethod } = api;

// Enhanced API response interfaces
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
    errors?: string[];
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}

export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export default api;