import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    async handle(req: Request, resp: Response): Promise<Response> {
            
        var listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        var categories = await listCategoriesUseCase.execute();

        return resp.json(categories);
    }
}