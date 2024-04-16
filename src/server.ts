import { CustomError, IErrorResponse } from '@adriand94/jobber-shared';
import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { Application, NextFunction, json, urlencoded, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';
import { config } from '@gateway/config';
// import { axiosAuthService } from './controllers/auth';
import { isAxiosError } from 'axios';
import { IController } from './controllers/auth/AuthController';
import { AxiosService } from './services/axios';

const DEFAULT_ERROR_CODE = 500;

export class GatewayServer {
  private SERVER_PORT = 4000;
  
  private BASE_PATH: string = '/api/gateway/v1'
  constructor(
    private app: Application,
    private logger: Logger,
    private controllers: IController[],
    private axiosAuthService: AxiosService
  ) {

  }

  public async start(): Promise<void> {
    this.securityMiddleware();
    this.standarMiddleware();
    this.initializeControllers(this.controllers);
    this.startElasticSearch();
    this.errorHandler();
    await this.startHttpServer();
  }

  private securityMiddleware(): void {
    this.app.set('trust proxy', 1);
    this.app.use(
      cookieSession({
        name: 'jobber-session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        //sameSite: none
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
      })
    );
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.session?.jwt) {
        this.axiosAuthService.axios.defaults.headers['Authorization'] = `Bearer ${req.session?.jwt}`
      }
      next();
    })
  }

  private standarMiddleware(): void {
    this.app.use(compression());
    this.app.use(json({ limit: '200mb' }));
    this.app.use(urlencoded({ extended: true, limit: '200mb' }));
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use(`${this.BASE_PATH}`, controller.router);
    });
  }


  private startElasticSearch(): void { }

  private errorHandler(): void {
    this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      this.logger.log('error', `${fullUrl} endpoint does not exist`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist' });
      next();
    });
    this.app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (isAxiosError(error)) {
        this.logger.log('error', `GatewayService Axios Error - ${error?.response?.data?.comingFrom}:`, error);
        res.status(error?.response?.data?.statusCode ?? DEFAULT_ERROR_CODE).json({ message: error?.response?.data?.message ?? 'Error occurred.' });
      }
      // this.logger.log('error', `GatewayService ${error.comingFrom}:`, error);
      if (error instanceof CustomError) {
        console.log(error);
        res.status(error.statusCode).json(error.serializeError());
      }
      next();
    });
  }

  private async startHttpServer(): Promise<void> {
    try {
      this.logger.info(`Worker with process id of ${process.pid} on gateway server has started`);
      this.app.listen(this.SERVER_PORT, () => {
        this.logger.info(`Gateway server running on port ${this.SERVER_PORT}`);
      });
    } catch (error) {
      this.logger.log('error', `GatewayService startServer() error method:`, error);
    }
  }
}
