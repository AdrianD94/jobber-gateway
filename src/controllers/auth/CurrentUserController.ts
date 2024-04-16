import { AuthService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IController } from "./AuthController";
import { AuthMiddleware } from "@gateway/services/auth-middleware";

export class CurrentUserController implements IController {
    public path: string = '/auth';
    public router = Router();

    constructor(private authService: AuthService, private authMiddleware: AuthMiddleware) {
        this.initializeRotues();
    }
    public initializeRotues() {
        this.router.get(`${this.path}/current-user`, this.authMiddleware.verifyUser, this.authMiddleware.checkAuthentication, this.getCurrentUser.bind(this));
        this.router.get(`${this.path}/refresh-token/:username`, this.authMiddleware.verifyUser, this.authMiddleware.checkAuthentication, this.resendEmail.bind(this));
    }

    private async getCurrentUser(_req: Request, res: Response): Promise<void> {   
        const response: AxiosResponse = await this.authService.getCurrentUser();
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
    private async resendEmail(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.resendEmail(req.body);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
}