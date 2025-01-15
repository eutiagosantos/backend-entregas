import { CreateDeliveryManUseCase } from './CreateDeliveryManUseCase';
import { Request, Response } from 'express';

export class CreateDeliveryManController {
    handle(request: Request, response: Response) {

        const { username, password } = request.body;
        const createDeliveryManUseCase = new CreateDeliveryManUseCase();
        const result = createDeliveryManUseCase.execute({ username, password });
        return response.json(result);
    }
}