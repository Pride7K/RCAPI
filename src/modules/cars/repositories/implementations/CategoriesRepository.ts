import {Category} from "../../entities/Category";

import { getRepository, Repository } from "typeorm"

import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository"

export class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>

    public constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            name, 
            description
        })

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        console.log("feijoada")
        console.log(this.repository)
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        console.log("feijoada")
        const category = await this.repository.findOne({
            name
        })
        console.log(category)
        return category;
    }
}