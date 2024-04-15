import { AuthService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUserController {
    constructor(private authService: AuthService) {

    }
    public async getCurrentUser(_req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.getCurrentUser();
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
    public async resendEmail(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.resendEmail(req.body);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
}