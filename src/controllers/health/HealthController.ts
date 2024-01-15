import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express';
export class HealthController {
    public health(_: Request, res: Response): void {
        res.status(StatusCodes.OK).send('Gayeway service is health and ok.')
    }
}