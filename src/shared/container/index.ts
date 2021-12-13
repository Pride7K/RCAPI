import { CategoriesRepository } from './../../modules/cars/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from './../../modules/cars/repositories/ICategoriesRepository';
import { container} from "tsyringe"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)