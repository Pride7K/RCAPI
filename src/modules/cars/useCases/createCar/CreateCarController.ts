import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';
import { Request, Response } from "express"

export class CreateCarController {
    async handle(req: Request, resp: Response): Promise<Response> {

        
        const {
            name,
            description,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            brand 
        } = req.body;

        const createCarUseCase =  container.resolve(CreateCarUseCase);
        
        const car = await createCarUseCase.execute({
            name,
            description,
            category_id,
            license_plate,
            fine_amount,
            daily_rate,
            brand 
        })

        return resp.status(201).json(car)
    }
}