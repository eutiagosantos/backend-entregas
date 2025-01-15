import { NextFunction, Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateClientUseCase';

export class AuthenticateClientController {

    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { username, password } = request.body;

            const authenticateClientUseCase = new AuthenticateUserUseCase();

            const result = await authenticateClientUseCase.execute({
                username,
                password
            });

            return response.json(result);
        } catch (error) {
            next(error);
        }
    }
}