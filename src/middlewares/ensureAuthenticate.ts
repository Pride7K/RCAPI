import { AppError } from './../errors/AppError';
import { UsersRepository } from './../modules/accounts/repositories/implementations/UsersRepository';
import { Request, Response, NextFunction, request } from 'express';
import { verify } from "jsonwebtoken"

interface IPayload {
    user_id: string
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
        const { user_id } = verify(
            token,
            "8f7eabc993b107b517b9e23ef6020463"
        ) as IPayload

        const usersRepository = new UsersRepository();

        var usersExists = await usersRepository.findById(user_id)

        if (!usersExists) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id
        };

        return next();
    }
    catch {
        throw new AppError("Invalid Token", 401)
    }
}