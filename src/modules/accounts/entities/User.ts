import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity("users")
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    driver_license: string;
    @Column()
    isAdmin: boolean;
    @Column()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}