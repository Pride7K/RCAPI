import { Specification } from './../../entities/Specification';
import { ISpecificationsDTO, ISpecificationsRepository } from '../ISpecificationsRepository';
import { getRepository, Repository } from 'typeorm';

export class SpecificationsRepository implements ISpecificationsRepository {

    private repository:Repository<Specification>

    public constructor() {
        this.repository = getRepository(Specification)
    }


    async create({ name, description }: ISpecificationsDTO): Promise<void> {
        const specification = await this.repository.create(
              {
                  description,
                  name
                })

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        var specif = await this.repository.findOne({name});
        return specif;
    }
}