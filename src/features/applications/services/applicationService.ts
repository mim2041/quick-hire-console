import { api } from "../../../core/api/api-client";
import { API_ENDPOINTS } from "../../../core/api/endpoints";
import type {
  Application,
  CreateApplicationPayload,
} from "../../jobs/types/job.types";

export const applicationService = {
  async createApplication(payload: CreateApplicationPayload): Promise<Application> {
    return api.post<Application>(API_ENDPOINTS.APPLICATIONS.CREATE, payload);
  },
};

