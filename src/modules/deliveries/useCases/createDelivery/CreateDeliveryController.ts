import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";
import { Request, Response } from "express";

export class CreateDeliveryController {
    handle(request: Request, response: Response) {
        const { item_name } = request.body;
        const { id_client } = request;

        try {
            const deliveryUseCase = new CreateDeliveryUseCase();

            const delivery = deliveryUseCase.execute({
                item_name,
                id_client,
            });

            return response.json(delivery);
        } catch (err) {
            console.error(err);
            return response.status(500).json({ error: "Internal server error" });
        }

    }
}