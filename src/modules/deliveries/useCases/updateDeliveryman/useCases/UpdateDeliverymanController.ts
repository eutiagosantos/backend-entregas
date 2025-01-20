import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";


export class UpdateDeliverymaController {
    handle(req: Request, res: Response) {
        const { id_deliveryman } = req;
        const { id: id_delivery } = req.params;
        const updadeDeliverymanUseCase = new UpdateDeliverymanUseCase();

        const delivery = updadeDeliverymanUseCase.execute({
            id_deliveryman,
            id_delivery
        });

        return res.json(delivery);
    }
}