import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.js";
import path from "node:path";
// import { fileURLToPath } from "node:url";
// import { dirname } from "node:path";
import {app} from "electron";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);



const isDev = process.env.NODE_ENV === "development"

const dbPath = isDev
    ? path.join(process.cwd(), "Splitz-dev.sqlite")
    : path.join(app.getPath("userData"), "Splitz.sqlite")

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: dbPath,
    synchronize: true,
    logging: isDev,
    entities: [User],
    migrations: [
        // migrationsPath,
    ],
    migrationsTableName: "migrations",
    migrationsRun: !isDev, // auto run migrations in production
});