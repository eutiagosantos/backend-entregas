import { FindAllAvailableUseCase } from './findAllAvailableUseCase';
import { Request, Response } from 'express';



export class FindAllAvailableController {

    async handle(req: Request, res: Response) {
        const findAllAvailableUseCase = new FindAllAvailableUseCase();
        const deliveries = await findAllAvailableUseCase.execute();


        if (!deliveries) {
            return res.status(404).json({ message: "No deliveries found" });
        }

        return res.json(deliveries);
    }

}