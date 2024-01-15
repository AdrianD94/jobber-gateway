import { Application } from "express";
import { authRouter } from "./routes/auth";
import { healthRouter } from "./routes/health";

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
    app.use(BASE_PATH, healthRouter);
    app.use(BASE_PATH, authRouter);
}