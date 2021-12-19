import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = []

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return await this.cars.find(t=> t.license_plate == licensePlate)
    }

    async create(data: ICreateCarDTO): Promise<Car> {
       const car = new Car();

       Object.assign(car,{
           ...data
       })

       await this.cars.push(car);
      
       return car;
    }

}