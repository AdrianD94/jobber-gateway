import { AuthService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VerifyEmailController {
    constructor(private authService: AuthService) {

    }
    public async update(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.verifyEmail(req.body.token);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
}