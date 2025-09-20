import { executeRun, executeQuery, executeQuerySingle, tableExists } from '../helper';
import { generateId } from '../utils';

export interface Settings {
    id: string;
    currency: string;
    theme: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
}

/**
 * Create settings table
 */
export function createSettingsTable(): void {
    if (tableExists('settings')) {
        console.log('Settings table already exists');
        return;
    }
    
    const createTableQuery = `
        CREATE TABLE settings (
            id TEXT PRIMARY KEY,
            currency TEXT NOT NULL DEFAULT 'MYR',
            theme TEXT NOT NULL DEFAULT 'light',
            user_id TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
    
    executeRun(createTableQuery);
    console.log('Settings table created successfully');
}

/**
 * Create settings for a user
 * @param userId User ID
 * @param settingsData Settings data (optional, will use defaults)
 * @returns Created settings
 */
export function createSettings(userId: string, settingsData?: Partial<Omit<Settings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Settings {
    const id = generateId();
    const currency = settingsData?.currency || 'MYR';
    const theme = settingsData?.theme || 'light';
    
    const query = `
        INSERT INTO settings (id, currency, theme, user_id)
        VALUES (?, ?, ?, ?)
    `;
    
    executeRun(query, [id, currency, theme, userId]);
    
    const createdSettings = getSettingsById(id);
    if (!createdSettings) {
        throw new Error('Failed to create settings');
    }
    
    return createdSettings;
}

/**
 * Get settings by ID
 * @param id Settings ID
 * @returns Settings or null if not found
 */
export function getSettingsById(id: string): Settings | null {
    const query = 'SELECT * FROM settings WHERE id = ?';
    const result = executeQuerySingle(query, [id]);
    return result || null;
}

/**
 * Get settings by user ID
 * @param userId User ID
 * @returns Settings or null if not found
 */
export function getSettingsByUserId(userId: string): Settings | null {
    const query = 'SELECT * FROM settings WHERE user_id = ?';
    const result = executeQuerySingle(query, [userId]);
    return result || null;
}

/**
 * Get all settings
 * @returns Array of settings
 */
export function getAllSettings(): Settings[] {
    const query = 'SELECT * FROM settings ORDER BY created_at DESC';
    return executeQuery(query);
}

/**
 * Update settings
 * @param id Settings ID
 * @param settingsData Updated settings data
 * @returns Updated settings or null if not found
 */
export function updateSettings(id: string, settingsData: Partial<Omit<Settings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Settings | null {
    const fields = [];
    const values = [];
    
    if (settingsData.currency !== undefined) {
        fields.push('currency = ?');
        values.push(settingsData.currency);
    }
    
    if (settingsData.theme !== undefined) {
        fields.push('theme = ?');
        values.push(settingsData.theme);
    }
    
    if (fields.length === 0) {
        return getSettingsById(id);
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const query = `UPDATE settings SET ${fields.join(', ')} WHERE id = ?`;
    const result = executeRun(query, values);
    
    if (result.changes === 0) {
        return null;
    }
    
    return getSettingsById(id);
}

/**
 * Update settings by user ID
 * @param userId User ID
 * @param settingsData Updated settings data
 * @returns Updated settings or null if not found
 */
export function updateSettingsByUserId(userId: string, settingsData: Partial<Omit<Settings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Settings | null {
    const fields = [];
    const values = [];
    
    if (settingsData.currency !== undefined) {
        fields.push('currency = ?');
        values.push(settingsData.currency);
    }
    
    if (settingsData.theme !== undefined) {
        fields.push('theme = ?');
        values.push(settingsData.theme);
    }
    
    if (fields.length === 0) {
        return getSettingsByUserId(userId);
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);
    
    const query = `UPDATE settings SET ${fields.join(', ')} WHERE user_id = ?`;
    const result = executeRun(query, values);
    
    if (result.changes === 0) {
        return null;
    }
    
    return getSettingsByUserId(userId);
}

/**
 * Delete settings
 * @param id Settings ID
 * @returns Boolean indicating success
 */
export function deleteSettings(id: string): boolean {
    const query = 'DELETE FROM settings WHERE id = ?';
    const result = executeRun(query, [id]);
    return result.changes > 0;
}

/**
 * Delete settings by user ID
 * @param userId User ID
 * @returns Boolean indicating success
 */
export function deleteSettingsByUserId(userId: string): boolean {
    const query = 'DELETE FROM settings WHERE user_id = ?';
    const result = executeRun(query, [userId]);
    return result.changes > 0;
}

export default {
    createSettingsTable,
    createSettings,
    getSettingsById,
    getSettingsByUserId,
    getAllSettings,
    updateSettings,
    updateSettingsByUserId,
    deleteSettings,
    deleteSettingsByUserId
};