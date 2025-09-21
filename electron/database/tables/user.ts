import { executeRun, executeQuery, executeQuerySingle, tableExists } from '../helper';
import { generateId } from '../utils';

export interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    created_at?: string;
    updated_at?: string;
}

/**
 * Create users table
 */
export function createUserTable(): void {
    if (tableExists('users')) {
        console.log('Users table already exists');
        return;
    }
    
    const createTableQuery = `
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    executeRun(createTableQuery);
    console.log('Users table created successfully');
}

/**
 * Insert a new user
 * @param userData User data to insert
 * @returns Inserted user with generated ID
 */
export function createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): User {
    const id = generateId();
    const query = `
        INSERT INTO users (id, name, username, password)
        VALUES (?, ?, ?, ?)
    `;
    
    executeRun(query, [id, userData.name, userData.username, userData.password]);
    
    const createdUser = getUserById(id);
    if (!createdUser) {
        throw new Error('Failed to create user');
    }
    
    return createdUser;
}

/**
 * Get user by ID
 * @param id User ID
 * @returns User or null if not found
 */
export function getUserById(id: string): User | null {
    const query = 'SELECT * FROM users WHERE id = ?';
    const result = executeQuerySingle(query, [id]);
    return result || null;
}

/**
 * Get user by username
 * @param username User username
 * @returns User or null if not found
 */
export function getUserByUsername(username: string): User | null {
    const query = 'SELECT * FROM users WHERE username = ?';
    const result = executeQuerySingle(query, [username]);
    return result || null;
}

/**
 * Get all users
 * @returns Array of users
 */
export function getAllUsers(): User[] {
    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    return executeQuery(query);
}

/**
 * Get first user (for checking if setup is needed)
 * @returns First user or null if no users exist
 */
export function getFirstUser(): User | null {
    const query = 'SELECT * FROM users LIMIT 1';
    const result = executeQuerySingle(query);
    return result || null;
}

/**
 * Update user
 * @param id User ID
 * @param userData Updated user data
 * @returns Updated user or null if not found
 */
export function updateUser(id: string, userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): User | null {
    const fields = [];
    const values = [];
    
    if (userData.name !== undefined) {
        fields.push('name = ?');
        values.push(userData.name);
    }
    
    if (userData.username !== undefined) {
        fields.push('username = ?');
        values.push(userData.username);
    }
    
    if (fields.length === 0) {
        return getUserById(id);
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    const result = executeRun(query, values);
    
    if (result.changes === 0) {
        return null;
    }
    
    return getUserById(id);
}

/**
 * Delete user
 * @param id User ID
 * @returns Boolean indicating success
 */
export function deleteUser(id: string): boolean {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = executeRun(query, [id]);
    return result.changes > 0;
}

/**
 * Count total users
 * @returns Number of users
 */
export function countUsers(): number {
    const query = 'SELECT COUNT(*) as count FROM users';
    const result = executeQuerySingle(query);
    return result?.count || 0;
}

export default {
    createUserTable,
    createUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    getFirstUser,
    updateUser,
    deleteUser,
    countUsers
};