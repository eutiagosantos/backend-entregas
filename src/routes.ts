import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { Router, NextFunction } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from './modules/deliveryman/useCase/createDeliveryman/CreateDeliveryManController';


const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliveryManController();
routes.post("/authenticate", (req, res, next) => {
    authenticateClientController.handle(req, res, next);
})

routes.post("/clients/", (request, response) => {
    createClientController.handle(request, response)
});

routes.post("/deliveryman/", (request, response) => {
    createDeliverymanController.handle(request, response);
})

export { routes };