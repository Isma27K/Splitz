// Main database modules
export * from './helper';
export * from './init';
export * from './utils';

// Table modules
export * from './tables/user';
export * from './tables/settings';

// Default exports for convenience
export { default as dbHelper } from './helper';
export { default as dbInit } from './init';
export { default as dbUtils } from './utils';
export { default as userTable } from './tables/user';
export { default as settingsTable } from './tables/settings';

// Re-export commonly used functions
export {
    getDatabase,
    closeDatabase,
    executeQuery,
    executeQuerySingle,
    executeRun,
    executeTransaction
} from './helper';

export {
    initializeDatabase,
    isDatabaseInitialized,
    resetDatabase,
    runMigrations
} from './init';

export {
    createUser,
    getUserById,
    getUserByUsername,
    getFirstUser,
    updateUser,
    deleteUser,
    countUsers
} from './tables/user';

export {
    createSettings,
    getSettingsById,
    getSettingsByUserId,
    updateSettings,
    updateSettingsByUserId,
    deleteSettings
} from './tables/settings';

export {
    generateId,
    generateUUID,
    isValidEmail,
    sanitizeString
} from './utils';