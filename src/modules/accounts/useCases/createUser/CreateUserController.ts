import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from "express"


export class CreateUserController {
    async handle(req: Request, resp: Response): Promise<Response> {
        const { name, email, password, driver_license } = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute(
            {
                name,
                email,
                password,
                driver_license
            })
        return resp.status(201).send();
    }
}