import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface IDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliveryManUseCase {
    async execute({ username, password }: IDeliveryman) {
        const deliverymanExists = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if (deliverymanExists) {
            throw new Error("Deliveryman already exists");
        }

        const hashPassword = await hash(password, 10);

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username: username,
                password: hashPassword
            }
        });

        return deliveryman;
    }
}