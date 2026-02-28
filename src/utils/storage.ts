/**
 * Safe localStorage utilities to prevent JSON parsing errors
 */

export const storage = {
    /**
     * Safely get an item from localStorage
     */
    getItem(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(`Failed to get item from localStorage: ${key}`, error);
            return null;
        }
    },

    /**
     * Safely set an item in localStorage
     */
    setItem(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(`Failed to set item in localStorage: ${key}`, error);
        }
    },

    /**
     * Safely remove an item from localStorage
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Failed to remove item from localStorage: ${key}`, error);
        }
    },

    /**
     * Safely get and parse JSON from localStorage
     */
    getJSON<T>(key: string): T | null {
        try {
            const item = this.getItem(key);
            if (!item) return null;
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Failed to parse JSON from localStorage: ${key}`, error);
            // Remove corrupted data
            this.removeItem(key);
            return null;
        }
    },

    /**
     * Safely store JSON in localStorage
     */
    setJSON<T>(key: string, value: T): void {
        try {
            const jsonString = JSON.stringify(value);
            this.setItem(key, jsonString);
        } catch (error) {
            console.error(`Failed to store JSON in localStorage: ${key}`, error);
        }
    },

    /**
     * Clear all items from localStorage
     */
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Failed to clear localStorage', error);
        }
    },

    /**
     * Check if localStorage is available
     */
    isAvailable(): boolean {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }
}; 