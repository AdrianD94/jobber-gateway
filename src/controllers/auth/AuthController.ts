import { AuthService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface IController {
    path: string;
    router: Router;
};

export class AuthController implements IController {
    public path: string = '/auth';
    public router = Router();

    constructor(private authService: AuthService) {
        this.initializeRotues();
    }
    public initializeRotues() {
        this.router.post(`${this.path}/signup`, this.signup.bind(this));
        this.router.post(`${this.path}/signin`, this.signin.bind(this));
        this.router.put(`${this.path}/verify-email`, this.verifyEmail.bind(this));
        this.router.put(`${this.path}/forgot-password`, this.forgotPassword.bind(this));
        this.router.put(`${this.path}/reset-password/:token`, this.resetPassword.bind(this));
        this.router.put(`${this.path}/change-password`, this.changePassword.bind(this));
    }

    private async signup(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.signUp(req.body);
        req.session = { jwt: response.data.token };
        res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
    }

    private async signin(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.signIn(req.body);
        console.log(response);
        req.session = { jwt: response.data.token };
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    private async verifyEmail(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.verifyEmail(req.body.token);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    private async forgotPassword(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.forgotPassword(req.body.email);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }

    private async resetPassword(req: Request, res: Response): Promise<void> {
        const { password, confirmPassword } = req.body;
        const { token } = req.params;
        const response: AxiosResponse = await this.authService.resetPassword(token, password, confirmPassword);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }

    private async changePassword(req: Request, res: Response): Promise<void> {
        const { currentPassword, newPassword } = req.body;
        const response: AxiosResponse = await this.authService.changePassword(currentPassword, newPassword);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }
}