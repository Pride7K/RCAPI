import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsDTO, ISpecificationsRepository } from './../ISpecificationsRepository';

export class SpecificationInMemory implements ISpecificationsRepository {

    specifications: Specification[] = []

    async create({ name, description }: ISpecificationsDTO): Promise<Specification> {

        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        })

        await this.specifications.push(specification)

        return specification;

    }
    
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(t => t.name == name)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(t => ids.includes(t.id));
    }

}