// main.ts
import { ipcMain } from "electron";
import { getFirstUser, initializeDatabase, isDatabaseInitialized } from '../../database';

export function registerIsFirstTimeHandler() {
    ipcMain.handle("isFirstTime", async () => {
        try {
            console.log('IPC isFirstTime called');
            
            // Ensure database is initialized
            if (!isDatabaseInitialized()) {
                console.log('Database not initialized, initializing now...');
                initializeDatabase();
            }
            
            const user = getFirstUser();
            const isFirstTime = user === null;
            console.log(`First time check result: ${isFirstTime}`);
            return isFirstTime; // true = first time setup needed
        } catch (err) {
            console.error("Database error in isFirstTime:", err);
            return true; // fallback: assume first time if DB error
        }
    });
}
