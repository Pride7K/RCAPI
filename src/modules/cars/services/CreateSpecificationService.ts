import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

export class CreateSpecificationService {

    constructor(private specificationsRepository: ISpecificationsRepository) {

    }

    execute({ name, description }: IRequest) {

        var hasSpecificationAlready = this.specificationsRepository.findByName(name);

        if (hasSpecificationAlready) {
            throw new Error("Specification Already Exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
}