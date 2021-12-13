import { Request, Response } from "express";
import {container} from "tsyringe"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


export class CreateSpecificationController {

    handle(req: Request, resp: Response): Response {

        const { name, description } = req.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
       
        createSpecificationUseCase.execute({ name, description });

        return resp.status(201).send();
    }
}