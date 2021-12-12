import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) {

    }

    async handle(req: Request, resp: Response): Promise<Response> {
        const { name, description } = req.body;

        await this.createCategoryUseCase.execute({ name, description })

        return resp.status(201).send();
    }
}