import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string;
}

export default class CreateClientUseCase {

    async execute({ username, password }: ICreateClient) {
        //Validar se o usuario existe
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: username
            }
        });

        if (clientExists) {
            throw new Error("Client already exists");
        }

        //se o cliente nao existe, criptografar a senha
        const hashPassword = await hash(password, 10);

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            },
        });
        return client;
    }
}