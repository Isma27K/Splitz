/**
 * account.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 4:58 PM
 */

import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { AccountType } from "./enum/account_type";
import {Record} from "./record.ts";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column({
        type: "text",
        default: AccountType.LONG_TERM,
    })
    type!: AccountType;

    @Column("float")
    sum!: number;

    @Column("int", { default: 0 })
    proportion!: number;

    @CreateDateColumn({ type: "datetime" })
    createAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;

    @OneToMany(() => Record, (record) => record.account)
    records!: Record[];  // collection of records
}