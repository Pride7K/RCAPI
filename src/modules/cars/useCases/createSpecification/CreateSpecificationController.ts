import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";



export class CreateSpecificationController {

    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {

    }

    handle(req: Request, resp: Response): Response {

        const { name, description } = req.body;

        this.createSpecificationUseCase.execute({ name, description });

        return resp.status(201).send();
    }
}