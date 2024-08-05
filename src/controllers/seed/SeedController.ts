import { AuthService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface IController {
    path: string;
    router: Router;
};

export class SeedController implements IController {
    public path: string = '/auth';
    public router = Router();

    constructor(private authService: AuthService) {
        this.initializeRotues();
    }
    public initializeRotues() {
        this.router.put(`${this.path}/seed/:count`, this.seed.bind(this));
       
    }

    private async seed(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.seed(req.params.count);
        res.status(StatusCodes.OK).json({ message: response.data.message});
    }
}