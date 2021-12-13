import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe"

export class CreateCategoryController {
    async handle(req: Request, resp: Response): Promise<Response> {
        const { name, description } = req.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
        
        await createCategoryUseCase.execute({ name, description })

        return resp.status(201).send();
    }
}