import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from 'express';
import { IController } from "../auth/AuthController";
export class HealthController implements IController {
    public path: string = '/gateway-health';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.health.bind(this));
    }

    public health(_: Request, res: Response): void {
        res.status(StatusCodes.OK).send('Gayeway service is health and ok.')
    }
}