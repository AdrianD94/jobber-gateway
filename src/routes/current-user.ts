import { currentUserController, refreshTokenController } from '@gateway/controllers/auth';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Request, Response } from 'express';

const currentUser = express.Router();

currentUser.get('/auth/current-user', authMiddleware.checkAuthentication, (req: Request, res: Response) => currentUserController.getCurrentUser(req, res));
currentUser.get('/auth/refresh-token/:username', authMiddleware.checkAuthentication, (req: Request, res: Response) => refreshTokenController.getRefreshToken(req, res));
currentUser.post('/auth/signin', authMiddleware.checkAuthentication, (req: Request, res: Response) => currentUserController.resendEmail(req, res));

export { currentUser };