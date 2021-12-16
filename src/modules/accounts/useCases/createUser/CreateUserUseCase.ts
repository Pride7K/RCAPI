import { ICreateUserDTO } from './../../dtos/ICreateUserDTO';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { hash } from "bcryptjs"
import { AppError } from '../../../../errors/AppError';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ICreateUserDTO): Promise<void> {

        const userEmailAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userEmailAlreadyExists)
        {
            throw new AppError("User Already Exists")
        }

        const passwordHash = await hash(data.password, 8);

        data.password = passwordHash;

        return await this.usersRepository.create(data);
    }
}