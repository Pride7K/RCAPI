import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';


interface IRequest{
    category_id?:string;
    brand?:string;
    name?:string;
}

export class ListCarsUseCase {

    constructor(
        private carsRepository:ICarsRepository
    ){}

    async execute(data?:IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            data.brand,
            data.category_id,
            data.name
        );

        return cars;
    }
}