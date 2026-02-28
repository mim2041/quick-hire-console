import { api } from "../../../core/api/api-client";
import { API_ENDPOINTS } from "../../../core/api/endpoints";
import type {
  Application,
  CreateApplicationPayload,
} from "../../jobs/types/job.types";

export interface ApplicationsQueryParams {
  jobId?: string;
  email?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedApplicationsResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
  data: Application[];
}

export const applicationService = {
  async listApplications(
    params?: ApplicationsQueryParams,
  ): Promise<PaginatedApplicationsResponse> {
    const response = await api.get<PaginatedApplicationsResponse | Application[]>(
      API_ENDPOINTS.APPLICATIONS.LIST,
      { params },
    );

    if (Array.isArray(response)) {
      return {
        data: response,
      };
    }

    return response;
  },

  async createApplication(
    payload: CreateApplicationPayload,
  ): Promise<Application> {
    return api.post<Application>(API_ENDPOINTS.APPLICATIONS.CREATE, payload);
  },

  async getApplicationById(id: string): Promise<Application> {
    const response = await api.get<Application | { data: Application }>(
      API_ENDPOINTS.APPLICATIONS.GET_BY_ID(id),
    );
    const maybeEnvelope = response as { data?: Application };
    return (maybeEnvelope.data ?? response) as Application;
  },

  async updateApplication(
    id: string,
    payload: Partial<CreateApplicationPayload>,
  ): Promise<Application> {
    return api.patch<Application>(
      API_ENDPOINTS.APPLICATIONS.UPDATE(id),
      payload,
    );
  },

  async deleteApplication(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.APPLICATIONS.DELETE(id));
  },
};

