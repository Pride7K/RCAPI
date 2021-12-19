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

    async create({ name,
        description,
        category_id,
        license_plate,
        fine_amount,
        daily_rate,
        brand }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            name,
            description,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            brand
        })
        

        const carCreated = await this.repository.save(car);

        return carCreated;
    }
    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return await this.repository.findOne({ license_plate: licensePlate })
    }

}