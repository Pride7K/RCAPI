import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from './../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = []

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user,{
            ...data
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(t => t.email == email);

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find(t => t.id == id);

        return user;
    }

}