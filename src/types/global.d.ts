// types/global.d.ts
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
        };
    }
}

// This export statement is required to make this file a module
// Without it, TypeScript treats this as a script file
export {};