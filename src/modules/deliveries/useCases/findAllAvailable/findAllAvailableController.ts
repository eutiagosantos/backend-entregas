import { FindAllAvailableUseCase } from './findAllAvailableUseCase';
import { Request, Response } from 'express';



export class FindAllAvailableController {

    async handle(req: Request, res: Response) {

        const findAllAvailableUseCase = new FindAllAvailableUseCase();

        const deliveries = await findAllAvailableUseCase.execute();

        return res.json(deliveries);
    }
}