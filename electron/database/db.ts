import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.js";
import path from "node:path";
// import { fileURLToPath } from "node:url";
// import { dirname } from "node:path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: path.join(process.env.PORTABLE_EXECUTABLE_DIR || process.cwd(), "Splitz.sqlite"),
    synchronize: true, // auto create schema in dev (disable in prod + use migrations)
    entities: [User],
});