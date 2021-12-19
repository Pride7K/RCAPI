import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Entity, Column, PrimaryColumn,CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cars")
export class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;

    @ManyToOne(()=> Category)
    @JoinColumn({name:"category_id"})
    category:Category;

    @CreateDateColumn()
    created_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuidv4()
            this.available = true;
        }
    }

}