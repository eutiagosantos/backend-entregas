import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { Router, NextFunction } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from './modules/deliveryman/useCase/createDeliveryman/CreateDeliveryManController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/findAllAvailableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymaController } from './modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';

const routes = Router();

const createDeliveryController = new CreateDeliveryController();
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliveryManController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymaController();
const findAllDeliveriesClient = new FindAllDeliveriesController();

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

routes.get("/delivery/available", ensureAuthenticateDeliveryman, (req, res) => {
    findAllAvailableController.handle(req, res);
});

routes.put("/delivery/updateDelivery/:id", (req, res, next) => {
    ensureAuthenticateDeliveryman(req, res, next), updateDeliverymanController.handle(req, res);
});

routes.get("/client/deliveries", ensureAuthenticateClient, (req, res) => {
    findAllDeliveriesClient.handle(req, res);
})

export { routes };