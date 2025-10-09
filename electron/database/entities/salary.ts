/**
 * salary.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 10/10/2025 12:15 AM
 */
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Salary {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("decimal", { precision: 15, scale: 2 })
    salary!: number;

    @CreateDateColumn({ type: "datetime" })
    createAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    confirmAt!: Date;
}