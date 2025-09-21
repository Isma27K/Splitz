import { ipcMain } from "electron";
import { AppDataSource } from "../../database/db.js";
import { User } from "../../database/entities/user.js";

export function registerAuthHandlers() {
    ipcMain.on("login", async (_event, { email, password }) => {
        console.log("[AUTH] Login received:", email, password);
        try {
            if (!AppDataSource.isInitialized) {
                console.error("Database not initialized");
                return;
            }
            
            // For now, just log the attempt - you can add proper authentication later
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            console.log(`[AUTH] Found ${users.length} users in database`);
            
            // TODO: Add proper password hashing and verification
        } catch (error) {
            console.error("[AUTH] Login error:", error);
        }
    });

    ipcMain.on("logout", () => {
        console.log("[AUTH] Logout request");
        // TODO: Clear session/tokens
    });

    // Handler for creating first user during setup

    ipcMain.handle("createUser", async (_event, { name, password }) => {
        try {
            console.log("[AUTH] Creating user:", name, password);
            
            if (!AppDataSource.isInitialized) {
                throw new Error("Database not initialized");
            }
            
            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.find()

            // check if there is existing user
            if (user.length === 0) {
                const user = new User()
                user.username = name;
                user.password = password;

                await userRepository.save(user);
                console.log("[AUTH] User created successfully:", user.id);

                return { success: true, userId: user.id };
            }
            
            // // Check if user already exists
            // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // // @ts-expect-error
            // const existingUser = await userRepository.findOne({ where: { name } });
            // if (existingUser) {
            //     throw new Error("User already exists");
            // }
            //
            // // Create new user (you should hash the password in production)
            // const user = new User();
            // user.username = name;
            // // Note: Add email and password fields to User entity if needed
            //
            // await userRepository.save(user);
            // console.log("[AUTH] User created successfully:", user.id);
            //
            // return { success: true, userId: user.id };
        } catch (error) {
            console.error("[AUTH] Create user error:", error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return { success: false, error: error.message };
        }
    });
}
