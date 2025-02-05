import { Request, Response } from 'express';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';


export class FindAllDeliveriesDeliverymanController {
    async handle(req: Request, res: Response) {
        const { id_deliveryman } = req;

        const findAllDeliveries = new FindAllDeliveriesDeliverymanUseCase();
        const deliveries = await findAllDeliveries.execute(id_deliveryman);

        return res.json(deliveries);

    }
}