import { randomBytes } from 'crypto';

/**
 * Generate a unique ID similar to Prisma's cuid()
 * @returns Unique string ID
 */
export function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = randomBytes(8).toString('hex');
    return `${timestamp}_${randomPart}`;
}

/**
 * Generate a simple UUID v4
 * @returns UUID string
 */
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Validate email format
 * @param email Email string to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitize string input for database
 * @param input Input string
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
    return input.trim().replace(/[\x00-\x1F\x7F]/g, '');
}

/**
 * Convert database row to camelCase object
 * @param row Database row object
 * @returns Object with camelCase keys
 */
export function toCamelCase(row: any): any {
    if (!row || typeof row !== 'object') {
        return row;
    }
    
    const camelCaseRow: any = {};
    for (const [key, value] of Object.entries(row)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelCaseRow[camelKey] = value;
    }
    
    return camelCaseRow;
}

/**
 * Convert camelCase object to snake_case for database
 * @param obj Object with camelCase keys
 * @returns Object with snake_case keys
 */
export function toSnakeCase(obj: any): any {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    
    const snakeCaseObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        snakeCaseObj[snakeKey] = value;
    }
    
    return snakeCaseObj;
}

/**
 * Format date for SQLite
 * @param date Date object or string
 * @returns Formatted date string
 */
export function formatDateForDB(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toISOString();
}

/**
 * Parse date from SQLite
 * @param dateString Date string from database
 * @returns Date object
 */
export function parseDateFromDB(dateString: string): Date {
    return new Date(dateString);
}

export default {
    generateId,
    generateUUID,
    isValidEmail,
    sanitizeString,
    toCamelCase,
    toSnakeCase,
    formatDateForDB,
    parseDateFromDB
};