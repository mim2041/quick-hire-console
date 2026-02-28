import { ENV } from "../../config/env";

export interface MaintenanceConfig {
    isEnabled: boolean;
    title?: string;
    message?: string;
    estimatedDowntime?: string;
    contactEmail?: string;
    allowedIPs?: string[];
    allowedUserRoles?: string[];
    startTime?: string;
    endTime?: string;
    showCountdown?: boolean;
    customCSS?: string;
    emergencyContact?: {
        phone?: string;
        email?: string;
    };
}

class MaintenanceService {
    private readonly STORAGE_KEY = 'maintenance_mode_config';
    private readonly API_ENDPOINT = '/api/system/maintenance';

    /**
     * Get maintenance status from server or fallback to local config
     */
    async getMaintenanceStatus(): Promise<MaintenanceConfig> {
        // Skip server check if maintenance mode is disabled in environment
        if (ENV.MAINTENANCE_MODE === 'false' || ENV.MAINTENANCE_MODE === '0') {
            return { isEnabled: false };
        }

        try {
            // Try to fetch from server first
            const response = await fetch(this.API_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Don't include auth headers for maintenance check
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const config = await response.json();
                    this.saveLocalConfig(config);
                    return config;
                } else {
                    console.warn('Maintenance endpoint returned non-JSON response');
                }
            }
        } catch (error) {
            console.warn('Failed to fetch maintenance config from server:', error);
        }

        // Fallback to local storage or environment
        return this.getLocalConfig();
    }

    /**
     * Get default maintenance configuration
     */
    getDefaultConfig(): MaintenanceConfig {
        return {
            isEnabled: ENV.MAINTENANCE_MODE === 'true' || ENV.MAINTENANCE_MODE === '1',
            title: 'Preparing for Launch',
            message: "We're preparing our MVP for launch. Data on Deck will be live soon — thanks for your patience.",
            estimatedDowntime: 'Approximately 30 days',
            contactEmail: 'info@dataondeck.com',
            showCountdown: false,
            allowedIPs: [],
            allowedUserRoles: ['admin', 'super_admin'],
            emergencyContact: {
                email: 'info@dataondeck.com',
                phone: '+1 (908) 399-8337'
            }
        };
    }

    /**
     * Check if current user should bypass maintenance mode
     */
    shouldBypassMaintenance(userRole?: string, userIP?: string): boolean {
        const config = this.getLocalConfig();

        if (!config.isEnabled) {
            return true;
        }

        // Check user role
        if (userRole && config.allowedUserRoles?.includes(userRole)) {
            return true;
        }

        // Check IP address
        if (userIP && config.allowedIPs?.includes(userIP)) {
            return true;
        }

        // Check for bypass parameter in URL (for testing)
        if (ENV.NODE_ENV === "development") {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.has('bypass_maintenance');
        }

        return false;
    }

    /**
     * Save maintenance config to local storage
     */
    private saveLocalConfig(config: MaintenanceConfig): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
        } catch (error) {
            console.warn('Failed to save maintenance config to localStorage:', error);
        }
    }

    /**
     * Get maintenance config from local storage or environment
     */
    private getLocalConfig(): MaintenanceConfig {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to parse stored maintenance config:', error);
        }

        return this.getDefaultConfig();
    }

    /**
     * Clear local maintenance config
     */
    clearLocalConfig(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.warn('Failed to clear maintenance config from localStorage:', error);
        }
    }
}

export const maintenanceService = new MaintenanceService();