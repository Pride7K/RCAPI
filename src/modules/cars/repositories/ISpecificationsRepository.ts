
export interface ISpecificationsDTO {
    name: string,
    description: string
}

export interface ISpecificationsRepository {
    create({ name, description }: ISpecificationsDTO): void;
    findByName(name:string):ISpecificationsDTO;
}