import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "node:path";
import {app} from "electron";
import { User } from "./entities/user.js";
import {Record} from "./entities/record.ts";
import {Commitment} from "./entities/commitment.ts";
import {Account} from "./entities/account.ts";
import {Salary} from "./entities/salary.ts";


const isDev = process.env.NODE_ENV === "development"

const dbPath = isDev
    ? path.join(process.cwd(), "Splitz-dev.sqlite")
    : path.join(app.getPath("userData"), "Splitz.sqlite")

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: dbPath,
    synchronize: true,
    logging: isDev,
    entities: [User, Record, Commitment, Account, Salary],
    migrations: [
        // migrationsPath,
    ],
    migrationsTableName: "migrations",
    migrationsRun: !isDev, // auto run migrations in production
});