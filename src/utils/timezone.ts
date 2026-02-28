/**
 * Timezone utilities for global timezone support
 * Handles automatic timezone detection, formatting, and API integration
 */

export interface TimezoneInfo {
    timezone: string;
    offset: number;
    offsetString: string;
}

/**
 * Get user's current timezone information
 */
export const getUserTimezone = (): TimezoneInfo => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset() * -1; // Convert to positive offset
    const offsetString = formatTimezoneOffset(offset);

    return {
        timezone,
        offset,
        offsetString
    };
};

/**
 * Format timezone offset as string (e.g., "+05:30", "-08:00")
 */
export const formatTimezoneOffset = (offset: number): string => {
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;

    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Format date in user's timezone
 */
export const formatDateInTimezone = (
    date: string | Date,
    options: Intl.DateTimeFormatOptions = {},
    timezone?: string
): string => {
    const userTimezone = timezone || getUserTimezone().timezone;

    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: userTimezone,
        ...options
    };

    return new Date(date).toLocaleString('en-US', defaultOptions);
};

/**
 * Format date with timezone info
 */
export const formatDateWithTimezone = (
    date: string | Date,
    includeTimezone = true,
    timezone?: string
): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone || getUserTimezone().timezone
    };

    if (includeTimezone) {
        options.timeZoneName = 'short';
    }

    return new Date(date).toLocaleString('en-US', options);
};

/**
 * Format date for API requests (ISO string)
 */
export const formatDateForAPI = (date: string | Date): string => {
    return new Date(date).toISOString();
};

/**
 * Parse date from API response (handles timezone conversion)
 */
export const parseDateFromAPI = (dateString: string, timezone?: string): Date => {
    const date = new Date(dateString);
    const userTimezone = timezone || getUserTimezone().timezone;

    // Convert to user's timezone
    return new Date(date.toLocaleString('en-US', { timeZone: userTimezone }));
};

/**
 * Get timezone headers for API requests
 */
export const getTimezoneHeaders = (): Record<string, string> => {
    const { timezone, offset } = getUserTimezone();

    return {
        'X-User-Timezone': timezone,
        'X-Timezone-Offset': offset.toString()
    };
};

/**
 * Validate timezone string
 */
export const isValidTimezone = (timezone: string): boolean => {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    } catch {
        return false;
    }
};

/**
 * Get list of common timezones
 */
export const getCommonTimezones = (): Array<{ value: string; label: string; offset: string }> => {
    const timezones = [
        'UTC',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Asia/Kolkata',
        'Australia/Sydney',
        'Pacific/Auckland'
    ];

    return timezones.map(tz => {
        const offset = new Date().toLocaleString('en-US', {
            timeZone: tz,
            timeZoneName: 'longOffset'
        }).split(' ').pop() || '+00:00';

        return {
            value: tz,
            label: `${tz} (${offset})`,
            offset
        };
    });
};

/**
 * Convert date to specific timezone
 */
export const convertToTimezone = (
    date: string | Date,
    targetTimezone: string
): Date => {
    return new Date(date.toLocaleString('en-US', { timeZone: targetTimezone }));
};

/**
 * Get current time in specific timezone
 */
export const getCurrentTimeInTimezone = (timezone: string): Date => {
    return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
};
