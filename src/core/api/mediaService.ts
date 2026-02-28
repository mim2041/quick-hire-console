import { api } from './api-client';
import { API_ENDPOINTS } from './endpoints';

export interface MediaUploadResponse {
    status: number;
    success: boolean;
    message: string;
    data: Array<{
        filename: string;
        size: number;
        key: string;
        type: string;
        mimetype: string;
        url: string;
        versionId: string;
    }>;
    path: string;
}

export const mediaService = {
    /**
     * Upload files to media API
     */
    async uploadFiles(files: File[]): Promise<MediaUploadResponse> {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        return api.post<MediaUploadResponse>(API_ENDPOINTS.MEDIA.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * Upload single file
     */
    async uploadFile(file: File): Promise<MediaUploadResponse> {
        return this.uploadFiles([file]);
    },
};