// types/global.d.ts
import {AccountDTO} from './Entity/account.dto.ts'

declare global {
    interface Window {
        auth: {
            isFirstTime: () => Promise<boolean>;
            createUser: (
                name: string,
                password: string,
                income: number,
                paydate: number
            ) => Promise<{ success: boolean; userId?: number; error?: string }>;
            loginUser: (
                username: string,
                password: string,
            ) => Promise<boolean>;
        },
        account: {
            createAccount: (
                name: string,
                accountType: string,
                proportion: number
            ) => Promise<boolean>;
            getAllAccount: () => Promise<AccountDTO[]>;
            createRecord: (
                name: string,
                description: string,
                sum: number,
                accountId: number
            ) => Promise<boolean>
        }
    }
}

// This export statement is required to make this file a module
// Without it, TypeScript treats this as a script file
export {};