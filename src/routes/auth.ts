// import { passwordController, signInController, signupController, verifyEmailController } from '@gateway/controllers/auth';
// import express, { Request, Response } from 'express';

// const authRouter = express.Router();
// authRouter.post('/auth/signup', (req: Request, res: Response) => signupController.create(req, res));
// authRouter.post('/auth/signin', (req: Request, res: Response) => signInController.read(req, res));
// authRouter.put('/auth/verify-email', (req: Request, res: Response) => verifyEmailController.update(req, res));
// authRouter.put('/auth/forgot-password', (req: Request, res: Response) => passwordController.forgotPassword(req, res));
// authRouter.put('/auth/reset-password/:token', (req: Request, res: Response) => passwordController.resetPassword(req, res));
// authRouter.put('/auth/change-password', (req: Request, res: Response) => passwordController.changePassword(req, res));

// export { authRouter };