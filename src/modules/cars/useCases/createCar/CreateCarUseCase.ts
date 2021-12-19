import { AppError } from './../../../../shared/errors/AppError';
import "reflect-metadata"
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';



@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute(data: ICreateCarDTO): Promise<Car> {



        var carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate)

        if (carAlreadyExists) {
            throw new AppError("Car Already Exists")
        }


        var car = await this.carsRepository.create(data);


        return car;

    }
}