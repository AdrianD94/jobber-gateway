import { AuthService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class PasswordController {
    constructor(private authService: AuthService) {

    }
    public async forgotPassword(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.forgotPassword(req.body.email);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }
    public async resetPassword(req: Request, res: Response): Promise<void> {
        const { password, confirmPassword } = req.body;
        const { token } = req.params;
        const response: AxiosResponse = await this.authService.resetPassword(token, password, confirmPassword);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }
    public async changePassword(req: Request, res: Response): Promise<void> {
        const { currentPassword, newPassword } = req.body;
        const response: AxiosResponse = await this.authService.changePassword(currentPassword, newPassword);
        res.status(StatusCodes.OK).json({ message: response.data.message });
    }
}