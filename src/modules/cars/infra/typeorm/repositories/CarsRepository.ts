import { QueryRunner } from 'typeorm';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';


export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id)
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository.createQueryBuilder(
            "c"
        ).where("available = :available", { available: true })

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand: brand })
        }
        if (name) {
            carsQuery.andWhere("c.name = :name", { name: name })
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id: category_id })
        }

        return await carsQuery.getMany();
    }

    async create({ name,
        description,
        category_id,
        license_plate,
        fine_amount,
        daily_rate,
        brand,
        specifications,
        id
     }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            name,
            description,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            brand,
            specifications
        })


        const carCreated = await this.repository.save(car);

        return carCreated;
    }
    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return await this.repository.findOne({ license_plate: licensePlate })
    }

}