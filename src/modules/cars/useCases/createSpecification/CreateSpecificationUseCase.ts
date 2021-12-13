import { injectable, inject } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

@injectable()
export class CreateSpecificationUseCase {
        constructor(
            @inject("SpecificationsRepository")
            private specificationsRepository: ISpecificationsRepository) {

        }

    execute({ name, description }: IRequest): void {

        var hasSpecificationAlready = this.specificationsRepository.findByName(name);

        if (hasSpecificationAlready) {
            throw new Error("Specification Already Exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
}