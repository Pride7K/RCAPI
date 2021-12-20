import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string; 
}

interface IResponse{
    user:{
        name:string;
        email:string;
    }
    token:string;
}

@injectable()
export class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email or passoword incorrect")
        }

        const passwordMatch = password === user.password;

        console.log(`bruh: ${passwordMatch}. ${password} ${user.password}`)
        if (!passwordMatch) {

            throw new AppError("Email or passoword incorrect")
        }


        const token = sign({}, "8f7eabc993b107b517b9e23ef6020463", {
            subject: user.id,
            expiresIn: "1d"
        });


        return {
            user:{
                name:user.name,
                email:user.email
            },
            token
        }
    }
}