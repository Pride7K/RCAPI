import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) {

    }

    handle(req: Request, resp: Response): Response {
        console.log("teste")
        const { name, description } = req.body;

        this.createCategoryUseCase.execute({ name, description })

        return resp.status(201).send();
    }
}