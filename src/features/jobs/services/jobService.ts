import { api } from "../../../core/api/api-client";
import { API_ENDPOINTS } from "../../../core/api/endpoints";
import type {
  CreateJobPayload,
  Job,
  JobsQueryParams,
  PaginatedJobsResponse,
} from "../types/job.types";

export const jobService = {
  async listJobs(params?: JobsQueryParams): Promise<PaginatedJobsResponse> {
    return api.get<PaginatedJobsResponse>(API_ENDPOINTS.JOBS.LIST, {
      params,
    });
  },

  async createJob(payload: CreateJobPayload): Promise<Job> {
    return api.post<Job>(API_ENDPOINTS.JOBS.CREATE, payload);
  },

  async getJobById(id: string): Promise<Job> {
    return api.get<Job>(API_ENDPOINTS.JOBS.GET_BY_ID(id));
  },

  async deleteJob(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.JOBS.DELETE(id));
  },
};

