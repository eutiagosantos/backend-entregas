import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { Router, NextFunction, Request, Response } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from './modules/deliveryman/useCase/createDeliveryman/CreateDeliveryManController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/findAllAvailableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymaController } from './modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCase/deliveries/FIndAllDeliveriesDeliverymanController';

const routes = Router();

const createDeliveryController = new CreateDeliveryController();
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliveryManController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymaController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController();

routes.post("/authenticate/clients", (req: Request, res: Response, next: NextFunction) => {
    authenticateClientController.handle(req, res, next);
});

routes.post("/authenticate/deliveryman", (req: Request, res: Response, next: NextFunction) => {
    authenticateDeliverymanController.handle(req, res, next);
});

routes.post("/clients/", (req: Request, res: Response) => {
    createClientController.handle(req, res)
});

routes.post("/deliveryman/", (req: Request, res: Response) => {
    createDeliverymanController.handle(req, res);
});

routes.post("/delivery/", (req: Request, res: Response, next: NextFunction) => {
    ensureAuthenticateClient(req, res, next), createDeliveryController.handle(req, res);
});

routes.get("/delivery/available", ensureAuthenticateDeliveryman, (req: Request, res: Response) => {
    findAllAvailableController.handle(req, res);
});

routes.put("/delivery/updateDelivery/:id", (req: Request, res: Response, next: NextFunction) => {
    ensureAuthenticateDeliveryman(req, res, next), updateDeliverymanController.handle(req, res);
});

routes.get("/client/deliveries", ensureAuthenticateClient, (req: Request, res: Response) => {
    findAllDeliveriesClient.handle(req, res);
})

routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, (req: Request, res: Response) => {
    findAllDeliveriesDeliveryman.handle(req, res);
})

export { routes };