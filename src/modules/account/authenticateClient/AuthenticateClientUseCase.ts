import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateUserUseCase {
    async execute({ username, password }: IAuthenticateClient) {

        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid");
        }

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid");
        }

        const token = sign({ username }, "2791b69c98d8f976456f2875a60230c1", {
            subject: client.id,
            expiresIn: "1d",
        });

        return token;
    }
}