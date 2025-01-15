import { Request, Response } from "express";
import CreateClientUseCase from "./CreateClientUseCase";

export class CreateClientController {
    handle(request: Request, response: Response) {

        const { username, password } = request.body;
        const createClientUseCase = new CreateClientUseCase();
        const result = createClientUseCase.execute({
            username,
            password,
        });

        return response.status(200).json(result);
    }
}