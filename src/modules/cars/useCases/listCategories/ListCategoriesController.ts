import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {

    }
    handle(req: Request, resp: Response): Response {
        var categories = this.listCategoriesUseCase.execute();

        return resp.json(categories);
    }
}