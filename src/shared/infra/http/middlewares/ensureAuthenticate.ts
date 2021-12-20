import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { Request, Response, NextFunction, request } from 'express';
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export async function ensureAuthenticate(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const  {sub}  = verify(
            token,
            "8f7eabc993b107b517b9e23ef6020463"
        ) as IPayload

        console.log(sub)
        console.log(token);

        const usersRepository = new UsersRepository();

        var usersExists = await usersRepository.findById(sub)

        if (!usersExists) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: sub
        };

        return next();
    }
    catch {
        throw new AppError("Invalid Token", 401)
    }
}