import { Request, Response } from "express";
import {container} from "tsyringe"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


export class CreateSpecificationController {

    async handle(req: Request, resp: Response): Promise<Response> {

        const { name, description } = req.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
       
        await createSpecificationUseCase.execute({ name, description });

        return resp.status(201).send();
    }
}