import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
    findByName(name:string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name,description}:ICreateCategoryDTO): Promise<void>;
}

export interface ICreateCategoryDTO {
    name: string,
    description: string
}