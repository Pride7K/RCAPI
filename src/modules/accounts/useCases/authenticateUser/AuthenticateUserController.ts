import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from 'express';


export class AuthenticateUserController {


    async handle(req:Request,resp:Response):Promise<Response> {
        const {email,password} = req.body;

        const authenticateUserUseCase = 
        container.resolve(AuthenticateUserUseCase);

        const token = await 
        authenticateUserUseCase.execute({email,password})

        return resp.json(token)
    }
}