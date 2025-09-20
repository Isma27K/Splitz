// main.ts
import {PrismaClient} from '@prisma/client';
import { ipcMain } from "electron";

const prisma = new PrismaClient();

export function registerIsFirstTimeHandler() {
    ipcMain.handle("isFirstTime", async () => {
        try {
            const user = await prisma.user.findFirst();
            return user === null; // true = first time setup needed
        } catch (err) {
            console.error("Prisma error:", err);
            return true; // fallback: assume first time if DB error
        }
    });
}
