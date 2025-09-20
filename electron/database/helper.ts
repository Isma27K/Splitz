import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

// Database connection singleton
let db: Database.Database | null = null;

/**
 * Get or create database connection
 * @returns Database instance
 */
export function getDatabase(): Database.Database {
    if (!db) {
        // Ensure app is ready before accessing userData path
        if (!app.isReady()) {
            throw new Error('Cannot access database before app is ready. Call this after app.whenReady()');
        }
        
        const userDataPath = app.getPath('userData');
        console.log(`User data path: ${userDataPath}`);
        
        const dbPath = path.join(userDataPath, 'Splitz.db');
        console.log(`Attempting to create database at: ${dbPath}`);
        
        try {
            db = new Database(dbPath);
            
            // Enable foreign keys
            db.pragma('foreign_keys = ON');
            
            // Set journal mode to WAL for better performance
            db.pragma('journal_mode = WAL');
            
            console.log(`Database connected successfully at: ${dbPath}`);
        } catch (error) {
            console.error(`Failed to create database at ${dbPath}:`, error);
            throw error;
        }
    }
    return db;
}

/**
 * Close database connection
 */
export function closeDatabase(): void {
    if (db) {
        db.close();
        db = null;
        console.log('Database connection closed');
    }
}

/**
 * Execute a query with parameters
 * @param query SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export function executeQuery(query: string, params: any[] = []): any {
    const database = getDatabase();
    try {
        const stmt = database.prepare(query);
        return stmt.all(params);
    } catch (error) {
        console.error('Query execution error:', error);
        throw error;
    }
}

/**
 * Execute a single row query
 * @param query SQL query string
 * @param params Query parameters
 * @returns Single row result or undefined
 */
export function executeQuerySingle(query: string, params: any[] = []): any {
    const database = getDatabase();
    try {
        const stmt = database.prepare(query);
        return stmt.get(params);
    } catch (error) {
        console.error('Single query execution error:', error);
        throw error;
    }
}

/**
 * Execute an insert/update/delete query
 * @param query SQL query string
 * @param params Query parameters
 * @returns Query run result with changes and lastInsertRowid
 */
export function executeRun(query: string, params: any[] = []): Database.RunResult {
    const database = getDatabase();
    try {
        const stmt = database.prepare(query);
        return stmt.run(params);
    } catch (error) {
        console.error('Run query execution error:', error);
        throw error;
    }
}

/**
 * Execute multiple queries in a transaction
 * @param queries Array of query objects with query and params
 * @returns Transaction result
 */
export function executeTransaction(queries: { query: string; params?: any[] }[]): any {
    const database = getDatabase();
    const transaction = database.transaction(() => {
        const results = [];
        for (const { query, params = [] } of queries) {
            const stmt = database.prepare(query);
            results.push(stmt.run(params));
        }
        return results;
    });
    
    try {
        return transaction();
    } catch (error) {
        console.error('Transaction execution error:', error);
        throw error;
    }
}

/**
 * Check if a table exists
 * @param tableName Name of the table
 * @returns Boolean indicating if table exists
 */
export function tableExists(tableName: string): boolean {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;
    const result = executeQuerySingle(query, [tableName]);
    return result !== undefined;
}

/**
 * Get database info
 * @returns Database information
 */
export function getDatabaseInfo(): any {
    const database = getDatabase();
    return {
        path: database.name,
        open: database.open,
        readonly: database.readonly,
        memory: database.memory
    };
}

export default {
    getDatabase,
    closeDatabase,
    executeQuery,
    executeQuerySingle,
    executeRun,
    executeTransaction,
    tableExists,
    getDatabaseInfo
};