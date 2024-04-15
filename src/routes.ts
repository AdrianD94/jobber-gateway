import { Application } from "express";
import { authRouter } from "./routes/auth";
import { healthRouter } from "./routes/health";
import { currentUser } from "./routes/current-user";
import {  authMiddleware } from "./services/auth-middleware";

const BASE_PATH = '/api/gateway/v1';
export const appRoutes = (app: Application) => {
    app.use(BASE_PATH, healthRouter);
    app.use(BASE_PATH, authRouter);
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUser);
}