import { api } from "../../../core/api/api-client";
import { API_ENDPOINTS } from "../../../core/api/endpoints";
import type { LoginCredentials, LoginResponse } from "../types/auth.types";

interface RawLoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: LoginResponse;
  path: string;
}

export const authService = {
  /**
   * Login user with email and password
   * Normalizes API envelope into a flat LoginResponse shape.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<RawLoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    );
    return response.data;
  },
};
