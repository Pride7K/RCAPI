import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from './../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { UsersRepositoryInMemory } from './../../repositories/in-memory/UsersRepositoryInMemory';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;

let createUserUseCase:CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("should be able to authenticate user", async () => {
        const user:ICreateUserDTO = {
            name: "Guilherme",
            email:"dsfasdas",
            password:"324234",
            driver_license: "sdasddsa"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email:user.email,
            password:user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("should not be able to authenticate nonexistent user", async ()=>{
        expect(async()=>{
            const result = await authenticateUserUseCase.execute(
            {
                    email:"2323",
                    password:"231"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be not be able authenticate in case of incorrect password",()=>{
        
        expect(async ()=>{
            const user:ICreateUserDTO = {
                name: "Guilherme",
                email:"dsfasdas",
                password:"324234",
                driver_license: "sdasddsa"
            }
    
            await createUserUseCase.execute(user);

            const result = await authenticateUserUseCase.execute({
                email:user.email,
                password:""
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})