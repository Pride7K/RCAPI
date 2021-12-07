import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { Request, Response } from "express";

export class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {

    }
    
    handle(req: Request, resp: Response) {
        const { file } = req;
        this.importCategoryUseCase.execute(file);
        return resp.send();
    }
}