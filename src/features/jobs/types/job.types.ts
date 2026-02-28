export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  job: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export interface JobsQueryParams {
  searchTerm?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export interface JobsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaginatedJobsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: JobsPaginationMeta;
  data: Job[];
}

export interface CreateJobPayload {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

export interface CreateApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

