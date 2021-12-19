import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { injectable,inject } from 'tsyringe';
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