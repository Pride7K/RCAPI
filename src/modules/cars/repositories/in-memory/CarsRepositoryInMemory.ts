import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = []

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return await this.cars.find(t => t.license_plate == licensePlate)
    }

    async findAvailable(brand?:string,category_id?:string,name?:string): Promise<Car[]> {
        var all = await this.cars
        .filter(t => t.available)

        if(brand)
        {
            all = all.filter(t=> t.brand == brand)
        }
        if(category_id)
        {
            all = all.filter(t=> t.category_id == category_id)
        }
        if(name)
        {
            all = all.filter(t=> t.name == name)
        }

        return all;
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            ...data
        })

        await this.cars.push(car);

        return car;
    }

}