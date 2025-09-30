/**
 * registerAssetRetrival.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/30/2025 10:00 PM
 */
import {ipcMain} from "electron";
import {AppDataSource} from "../../database/db.ts";
import {Account} from "../../database/entities/account.ts";

export function RegisterAssetRetrieval() {
    ipcMain.handle('getAllAccount', async ()=> {
        try {
            const accountRepository = AppDataSource.getRepository(Account);
            const accounts = await accountRepository.find({
                relations: ['records']  // Add this to load the records relation
            });

            console.log(accounts);

            return accounts;
        }
        catch(e) {
            console.error(e);
            throw new Error("Failed to retrieve accounts"); // renderer will get a rejected promise
        }
    })
}