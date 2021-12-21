import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsDTO {
    name: string,
    description: string
}

export interface ISpecificationsRepository {
    create({ name, description }: ISpecificationsDTO): Promise<Specification>;
    findByName(name:string):Promise<Specification>;
    findByIds(ids:string[]):Promise<Specification[]>
}