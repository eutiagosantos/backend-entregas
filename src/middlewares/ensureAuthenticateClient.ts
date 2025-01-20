import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}
export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {

    const auth = request.headers.authorization;

    if (!auth) {
        return response.status(401).json({
            message: "Token missing"
        });
    }

    const [, token] = auth.split(" ");
    try {
        const { sub } = verify(token, "2791b69c98d8f976456f2875a60230c1") as IPayload;

        request.id_client = sub;

        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token"
        });
    }

}