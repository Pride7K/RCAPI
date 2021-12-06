import Category from "../model/Category"

export interface ICategoriesRepository {
    findByName(name:string): Category;
    list(): Category[];
    create({name,description}:ICreateCategoryDTO): void;
}

export interface ICreateCategoryDTO {
    name: string,
    description: string
}