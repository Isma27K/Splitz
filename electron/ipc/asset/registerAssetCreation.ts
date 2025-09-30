/**
 * assetCreation.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/30/2025 12:35 AM
 */
import {ipcMain} from "electron";
import {AppDataSource} from "../../database/db.js";
import {Account} from "../../database/entities/account.ts";
import {AccountType} from "../../database/entities/enum/account_type.ts";


export function registerAssetCreation() {
    ipcMain.handle('createAccount', async (_event, { name, type, proportion }): Promise<boolean> => {
        console.log("[ACCOUNT] asset creation received:", name, type, proportion);
        try{
            // check if type is a valid AccountType
            if (!Object.values(AccountType).includes(type)) {
                throw new Error(`Invalid account type: ${type}`);
            }

            // check proportion range
            if (typeof proportion !== "number" || proportion < 0 || proportion > 100) {
                throw new Error(`Invalid proportion: ${proportion}`);
            }

            const accountRepository = AppDataSource.getRepository(Account);

            const account = new Account();
            account.name = name;
            account.type = type;
            account.proportion = proportion;
            account.sum = 0;

            const result = await accountRepository.save(account);
            console.log(result);

            return true;
        }
        catch(error) {
            console.log("[ACCOUNT ERROR]:", error);
            return false; // Return false on error instead of true
        }
    })
}