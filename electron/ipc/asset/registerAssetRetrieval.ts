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
            const accounts = await accountRepository.find();

            console.log(accounts);

            // return accounts.map(acc => ({
            //     id: acc.id,
            //     name: acc.name,
            //     type: acc.type,
            //     sum: acc.sum,
            //     proportion: acc.proportion,
            //     createAt: acc.createAt.toISOString(),
            //     updatedAt: acc.updatedAt.toISOString(),
            // }));

            return accounts;
        }
        catch(e) {
            console.error(e);
            throw new Error("Failed to retrieve accounts"); // renderer will get a rejected promise
        }
    })
}