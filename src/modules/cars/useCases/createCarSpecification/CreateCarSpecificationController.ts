import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { Request, Response } from "express"

export class CreateCarSpecificationController {
    async handle(req: Request, resp: Response): Promise<Response> {

        const { car_id } = req.params;

        const { specifications_id } = req.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

        const cars = await createCarSpecificationUseCase.execute({
            car_id: car_id as string,
            specifications_id: specifications_id as string[]
        });

        return resp.json(cars);
    }
}