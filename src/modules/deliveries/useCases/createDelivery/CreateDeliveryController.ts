import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";
import { Request, Response } from "express";

export class CreateDeliveryController {
    handle(request: Request, response: Response) {
        const { item_name } = request.body;
        const { id_client } = request;

        const deliveryUseCase = new CreateDeliveryUseCase();

        const delivery = deliveryUseCase.execute({
            item_name,
            id_client,
        });

        return response.json(delivery);

    }
}