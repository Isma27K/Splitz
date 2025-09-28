import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    username!: string;

    @Column("text")
    password!: string;

    @Column("float")
    income!: number;

    @Column("date")
    payDate!: Date;

    @CreateDateColumn({ type: "datetime" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;
}
