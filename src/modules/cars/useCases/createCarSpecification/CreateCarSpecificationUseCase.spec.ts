import { SpecificationInMemory } from './../../repositories/in-memory/SpecificationInMemory';
import { SpecificationsRepository } from './../../infra/typeorm/repositories/SpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationInMemory: SpecificationInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationInMemory = new SpecificationInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationInMemory);
    })

    it("should not be able to add a new specification to a car", async () => {

        expect(async () => {
            const car_id = "121";
            const specifications_id = ["sdasd"]

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to add a new specification to a car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Teste",
            description: "teste",
            brand: "Teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            category_id: "category"
        });

        const specifications_id = await specificationInMemory.create({
            name: "teste",
            description: "sdasd"
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specifications_id.id]
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })
})