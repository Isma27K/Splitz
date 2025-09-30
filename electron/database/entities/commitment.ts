/**
 * comitment.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 6:26 PM
 */
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {CommitmentType} from "./enum/commitment_type.ts";
import {Record} from "./record.ts";


@Entity()
export class Commitment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column("text", {nullable: true})
    description!: string;

    @Column("decimal", { precision: 15, scale: 2 })
    total!: number;

    @Column({
        type: 'text',
    })
    commitmentType!: CommitmentType;

    @Column("datetime")
    duration!: Date;

    @CreateDateColumn({ type: "datetime" })
    createAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;

    @OneToMany(() => Record, (record) => record.account)
    records!: Record[];  // collection of records
}