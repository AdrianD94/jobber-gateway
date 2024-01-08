import { BadRequestError, IAuthPayload, NotAuthorizedError } from "@adriand94/jobber-shared";
import { Config } from "@gateway/config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class AuthMiddleware {
    public verifyUser(req: Request, _response: Response, next: NextFunction, config: Config): void {
        if (!req.session?.jwt) {
            throw new NotAuthorizedError('Token is not available, Please login again', 'GatewayService verifyUser()');
        }
        try {
            const payload: IAuthPayload = verify(req.session.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
            req.currentUser = payload;
        } catch (error) {
            throw new NotAuthorizedError('Token is not available, Please login again', 'GatewayService verifyUser() invalid session');
        }
        next();
    }

    public checkAuthentication(req: Request, _response: Response, next: NextFunction): void {
        if (!req.currentUser) {
            throw new BadRequestError('Authetication required to access this route', 'GatewayService checkAuthentication()');
        }
        next();
    }
};

