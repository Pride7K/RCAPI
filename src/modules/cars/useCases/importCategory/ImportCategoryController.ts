import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { Request, Response } from "express";


export class ImportCategoryController {

    handle(req: Request, resp: Response) {
        const { file } = req;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        importCategoryUseCase.execute(file);
        
        return resp.send();
    }
}