import { healthController } from '@gateway/controllers/health';
import express, { Request, Response } from 'express';

const healthRouter = express.Router();
healthRouter.get('/gateway-health', (request: Request, response: Response) => healthController.health(request, response))

export { healthRouter };