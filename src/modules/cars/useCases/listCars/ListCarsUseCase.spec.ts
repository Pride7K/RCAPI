import { Car } from './../../infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from './../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })
    it("should be able to list all cars", async () => {

        const car = {
            name: "teste",
            description: "sdsda",
            category_id: "cc388deb-fc16-47d7-9b38-d7f9b983c085",
            daily_rate: 10,
            fine_amount: 10,
            brand: "sdasd",
            license_plate: "sdasdasd"
        };

        carsRepositoryInMemory.create(car)

        var cars = await listCarsUseCase.execute({
            brand:"sdasd"
        });

        expect(cars).toHaveLength(1)
    })

    it("should be able to list all available cars by name", async () => {
        
        const car = {
            name: "teste",
            description: "sdsda",
            category_id: "cc388deb-fc16-47d7-9b38-d7f9b983c085",
            daily_rate: 10,
            fine_amount: 10,
            brand: "sdasd",
            license_plate: "sdasdasd"
        };

        const car2 = {
            name: "teste",
            description: "sdsda",
            category_id: "cc388deb-fc16-47d7-9b38-d7f9b983c085",
            daily_rate: 10,
            fine_amount: 10,
            brand: "bb",
            license_plate: "sdasdasd"
        };


        carsRepositoryInMemory.create(car)
        carsRepositoryInMemory.create(car2)

        var cars = await listCarsUseCase.execute({
            brand:"bb"
        });

        expect(cars).toHaveLength(1)
    })
})