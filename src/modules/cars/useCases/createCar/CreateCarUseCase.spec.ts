import { AppError } from './../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';


let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Teste",
            description: "teste",
            brand: "Teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    })

    it("should not create a new car if already exists one with same license", () => {
        expect(async () => {

            var car = {
                name: "Teste",
                description: "teste",
                brand: "Teste",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                category_id: "category"
            };

            await createCarUseCase.execute(car);

            await createCarUseCase.execute(car);

        }).rejects.toBeInstanceOf(AppError)
    })

    it("should create a new car available with true", async () => {
        var car = {
            name: "Teste",
            description: "teste",
            brand: "Teste",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            category_id: "category"
        };

        var carCreated = await createCarUseCase.execute(car);

        expect(carCreated.available).toBe(true);
    })
})