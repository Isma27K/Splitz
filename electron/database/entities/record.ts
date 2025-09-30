/**
 * record.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 5:45 PM
 */

/*
* this is record, it will hold the record of the transaction, for not it can hold commitment record and account record.
* so kept it in mind, later we MIGHT need to restructure it, but for now this should be sufficient
* */

import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Check} from "typeorm";
import {Account} from "./account.ts";
import {Commitment} from "./commitment.ts";


@Entity()
@Check(`(
  (accountId IS NOT NULL AND commitmentId IS NULL)
  OR (accountId IS NULL AND commitmentId IS NOT NULL)
)`)
export class Record {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text", { nullable: true })
    name: string | undefined;

    @Column("text",{nullable:true})
    description: string | undefined;

    @Column("decimal", { precision: 15, scale: 2 })
    sum!: number;

    @CreateDateColumn({ type: "datetime" })
    createAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;

    @ManyToOne(() => Account, (account) => account.records, { onDelete: "CASCADE", nullable: true })
    account!: Account | null;  // FK to Account

    @ManyToOne(() => Commitment, (commitment) => commitment.records, { onDelete: "CASCADE", nullable: true })
    commitment!: Commitment | null; // FK to Commitment
}