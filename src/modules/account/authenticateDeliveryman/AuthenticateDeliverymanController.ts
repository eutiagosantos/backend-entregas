import { NextFunction, Request, Response } from 'express';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase'

export class AuthenticateDeliverymanController {

    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { username, password } = request.body;

            const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

            const result = await authenticateDeliverymanUseCase.execute({
                username,
                password
            });

            return response.json(result);
        } catch (error) {
            next(error);
        }
    }
}