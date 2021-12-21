import { injectable,inject } from 'tsyringe';
import { ISpecificationsRepository } from './../../repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from './../../infra/typeorm/repositories/CarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute(data: IRequest): Promise<Car> {
        const carsExist = await this.carsRepository.findById(data.car_id)

        if (!carsExist) {
            throw new AppError("Car does not exists")
        }

        const specifications = await this.specificationsRepository.findByIds(data.specifications_id)

        carsExist.specifications = specifications;

        await this.carsRepository.create(carsExist)

        return carsExist;
    }
}