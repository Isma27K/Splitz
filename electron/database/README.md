# Database Module - Better-SQLite3

This module provides a modular database layer using Better-SQLite3, replacing the previous Prisma ORM implementation.

## Structure

```
database/
├── index.ts          # Main exports and convenience functions
├── helper.ts         # Database connection and utility functions
├── init.ts           # Database initialization and migrations
├── utils.ts          # Common utilities (ID generation, validation, etc.)
├── tables/
│   ├── user.ts       # User table operations
│   └── settings.ts   # Settings table operations
└── README.md         # This file
```

## Usage

### Basic Setup

```typescript
import { initializeDatabase, isDatabaseInitialized } from './database';

// Initialize database (usually in main.ts)
if (!isDatabaseInitialized()) {
    initializeDatabase();
}
```

### Using Table Operations

```typescript
import { createUser, getUserById, getFirstUser } from './database';

// Create a new user
const user = createUser({
    name: 'John Doe',
    email: 'john@example.com'
});

// Get user by ID
const foundUser = getUserById(user.id);

// Check if any users exist (for first-time setup)
const firstUser = getFirstUser();
const isFirstTime = firstUser === null;
```

### Direct Database Operations

```typescript
import { executeQuery, executeRun, executeTransaction } from './database';

// Execute a SELECT query
const users = executeQuery('SELECT * FROM users WHERE name LIKE ?', ['%John%']);

// Execute an INSERT/UPDATE/DELETE
const result = executeRun('UPDATE users SET name = ? WHERE id = ?', ['Jane Doe', userId]);

// Execute multiple queries in a transaction
const results = executeTransaction([
    { query: 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)', params: [id1, 'User 1', 'user1@example.com'] },
    { query: 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)', params: [id2, 'User 2', 'user2@example.com'] }
]);
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Settings Table
```sql
CREATE TABLE settings (
    id TEXT PRIMARY KEY,
    currency TEXT NOT NULL DEFAULT 'MYR',
    theme TEXT NOT NULL DEFAULT 'light',
    user_id TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Adding New Tables

To add a new table to the database:

1. **Create the table module** in `tables/` directory:

```typescript
// tables/newTable.ts
import { executeRun, executeQuery, executeQuerySingle, tableExists } from '../helper';
import { generateId } from '../utils';

export interface NewTable {
    id: string;
    // ... other fields
    created_at?: string;
    updated_at?: string;
}

export function createNewTableTable(): void {
    if (tableExists('new_table')) {
        console.log('New table already exists');
        return;
    }
    
    const createTableQuery = `
        CREATE TABLE new_table (
            id TEXT PRIMARY KEY,
            -- ... other columns
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    executeRun(createTableQuery);
    console.log('New table created successfully');
}

// ... CRUD operations
```

2. **Update the initialization** in `init.ts`:

```typescript
import { createNewTableTable } from './tables/newTable';

export function initializeDatabase(): void {
    // ... existing code
    createNewTableTable();
    // ...
}
```

3. **Export from index.ts**:

```typescript
export * from './tables/newTable';
export { default as newTableTable } from './tables/newTable';
```

## Migration from Prisma

This module replaces the previous Prisma ORM implementation. Key changes:

- **Database location**: Now stored in `app.getPath('userData')/Splitz.db`
- **ID generation**: Uses custom `generateId()` function instead of Prisma's `cuid()`
- **Queries**: Direct SQL queries instead of Prisma's query builder
- **Types**: TypeScript interfaces instead of Prisma generated types

## Performance Optimizations

- **WAL mode**: Enabled for better concurrent read performance
- **Foreign keys**: Enabled for data integrity
- **Prepared statements**: All queries use prepared statements for security and performance
- **Transactions**: Available for atomic operations

## Error Handling

All database operations include proper error handling and logging. Errors are logged to the console and re-thrown for handling by the calling code.

## Future Enhancements

- **Migrations system**: Framework for schema changes
- **Connection pooling**: If needed for high-concurrency scenarios
- **Query builder**: Optional query builder for complex queries
- **Backup/restore**: Database backup and restore functionality