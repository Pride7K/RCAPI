import { Specification } from '../../entities/Specification';
import { ISpecificationsDTO, ISpecificationsRepository } from '../ISpecificationsRepository';
import {inject,injectable} from "tsyringe"

export class SpecificationsRepository implements ISpecificationsRepository {

    private specifications: Specification[]

    private static INSTANCE: SpecificationsRepository;

    private constructor() {
        this.specifications = []
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
    }

    create({ name, description }: ISpecificationsDTO): void {
        const specification = new Specification();

        Object.assign(specification, { name, description });

        this.specifications.push(specification)
    }

    findByName(name: string): ISpecificationsDTO {
        return this.specifications.find(spec => spec.name == name);
    }
}