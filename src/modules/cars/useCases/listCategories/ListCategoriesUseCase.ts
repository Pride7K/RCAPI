import {Category} from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    async execute(): Promise<Category[]> {
        var categories = await this.categoriesRepository.list();
        return categories;
    }
}