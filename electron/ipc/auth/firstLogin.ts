// main.ts
import { ipcMain } from "electron";
import { AppDataSource } from "../../database/db.js";
import {User} from '../../database/entities/user.js'

export function registerIsFirstTimeHandler() {
    ipcMain.handle("isFirstTime", async () => {
        try {
            console.log('IPC isFirstTime called');
            
            // Check if database is initialized
            if (!AppDataSource.isInitialized) {
                console.log('Database not initialized yet');
                return true; // assume first time if DB not ready
            }
            
            const users = await AppDataSource.getRepository(User).find();
            const isFirstTime = users.length === 0;
            console.log(`First time check result: ${isFirstTime}`);
            return isFirstTime; // true = first time setup needed
        } catch (err) {
            console.error("Database error in isFirstTime:", err);
            return true; // fallback: assume first time if DB error
        }
    });
}
