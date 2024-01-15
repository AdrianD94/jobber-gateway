import { signupController } from '@gateway/controllers/auth';
import express, { Request, Response } from 'express';

const authRouter = express.Router();
authRouter.post('/auth/signup', (req: Request, res: Response) => signupController.create(req, res));

export { authRouter };