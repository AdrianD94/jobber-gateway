import { HealthController } from '@gateway/controllers/HealthController';
import express, { Request, Response, Router } from 'express';

export class HealthRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get('/gateway-health', (request:Request, response:Response) => new HealthController().health(request, response))
        return this.router;
    }
}