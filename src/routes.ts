import { Application } from "express";
import { HealthRoutes } from "./routes/health";

export const appRoutes = (app: Application) => {
    const healthRoutes = new HealthRoutes();
    app.use('', healthRoutes.routes());
}