import { injectable,inject } from 'tsyringe';
import {Category} from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {

    }

    async execute(): Promise<Category[]> {
        var categories = await this.categoriesRepository.list();
        return categories;
    }
}