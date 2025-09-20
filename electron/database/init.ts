import { getDatabase, tableExists, executeRun, executeTransaction } from './helper';
import { createUserTable } from './tables/user';
import { createSettingsTable } from './tables/settings';
import { app } from 'electron';

/**
 * Initialize the database with all required tables
 */
export function initializeDatabase(): void {
    console.log('Initializing database...');
    
    try {
        // Get database instance to ensure connection
        getDatabase();
        
        // Create tables in order (respecting foreign key dependencies)
        createUserTable();
        createSettingsTable();
        
        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}

/**
 * Check if database is properly initialized
 * @returns Boolean indicating if all required tables exist
 */
export function isDatabaseInitialized(): boolean {
    // If app is not ready, we can't check the database
    if (!app.isReady()) {
        console.log('App not ready, cannot check database initialization');
        return false;
    }
    
    const requiredTables = ['users', 'settings'];
    
    try {
        for (const table of requiredTables) {
            if (!tableExists(table)) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Error checking database initialization:', error);
        return false;
    }
}

/**
 * Reset database by dropping all tables and recreating them
 * WARNING: This will delete all data!
 */
export function resetDatabase(): void {
    console.log('Resetting database...');
    
    try {
        const dropQueries = [
            { query: 'DROP TABLE IF EXISTS settings' },
            { query: 'DROP TABLE IF EXISTS users' }
        ];
        
        executeTransaction(dropQueries);
        initializeDatabase();
        
        console.log('Database reset completed successfully');
    } catch (error) {
        console.error('Database reset failed:', error);
        throw error;
    }
}

/**
 * Run database migrations (for future use)
 * @param targetVersion Target schema version
 */
export function runMigrations(): void {
    // export function runMigrations(targetVersion?: number): void {
    console.log('Running database migrations...');
    
    try {
        // Create migrations table if it doesn't exist
        if (!tableExists('migrations')) {
            executeRun(`
                CREATE TABLE migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    version INTEGER NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
        }
        
        // Future migration logic can be added here
        // For now, just ensure basic tables exist
        if (!isDatabaseInitialized()) {
            initializeDatabase();
        }
        
        console.log('Database migrations completed successfully');
    } catch (error) {
        console.error('Database migrations failed:', error);
        throw error;
    }
}

export default {
    initializeDatabase,
    isDatabaseInitialized,
    resetDatabase,
    runMigrations
};