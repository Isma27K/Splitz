import {ipcMain} from "electron";
import {AppDataSource} from "../../database/db.js";
import {User} from "../../database/entities/user.js";
import {hashText, verifyPassword} from "../../utils/bcrypt.ts";

export function registerAuthHandlers() {
    ipcMain.handle("login", async (_event, { username, password }): Promise<boolean> => {
        console.log("[AUTH] Login received:", username, password);
        try {
            if (!AppDataSource.isInitialized) {
                console.error("Database not initialized");
                return false;
            }

            // For now, just log the attempt - you can add proper authentication later
            const userRepository = AppDataSource.getRepository(User);

            // kill switch
            const allUser = await userRepository.find()
            if (allUser.length > 1) {
                console.error("[AUTH] Multiple users found! Refusing login.");
                return false;
            }

            const user = await userRepository.findOne({where : { username: username }});
            if(user) {
                return await verifyPassword(password, user.password);
            }
            else {
                return false;
            }

        } catch (error) {
            console.error("[AUTH] Login error:", error);
            return false;
        }
    });

    ipcMain.on("logout", () => {
        console.log("[AUTH] Logout request");
        // TODO: Clear session/tokens
    });

    // Handler for creating first user during setup

    ipcMain.handle("createUser", async (_event, { name, password, income, paydate }) => {
        try {
            console.log("[AUTH] Creating user:", name, password, income, paydate);
            
            if (!AppDataSource.isInitialized) {
                throw new Error("Database not initialized");
            }
            
            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.find()

            // check if there is existing user
            if (user.length === 0) {
                const user = new User()
                const hashedPassword = await hashText(password);
                user.username = name;
                user.password = hashedPassword;
                user.income = income;
                user.payDate = paydate;

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
