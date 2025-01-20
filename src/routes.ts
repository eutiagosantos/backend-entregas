import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { Router, NextFunction } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from './modules/deliveryman/useCase/createDeliveryman/CreateDeliveryManController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';

const routes = Router();

const createDeliveryController = new CreateDeliveryController();
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliveryManController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

routes.post("/authenticate/clients", (req, res, next) => {
    authenticateClientController.handle(req, res, next);
});

routes.post("/authenticate/deliveryman", (req, res, next) => {
    authenticateDeliverymanController.handle(req, res, next);
});

routes.post("/clients/", (req, res) => {
    createClientController.handle(req, res)
});

routes.post("/deliveryman/", (req, res) => {
    createDeliverymanController.handle(req, res);
});

routes.post("/delivery/", (req, res, next) => {
    ensureAuthenticateClient(req, res, next), createDeliveryController.handle(req, res);
});

export { routes };