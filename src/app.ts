import 'express-async-errors'
import express from 'express';
import { GatewayServer } from './server';
import { winstonLogger } from '@adriand94/jobber-shared';
import { Logger } from 'winston';
import { config } from '@gateway/config';
import { Client } from '@elastic/elasticsearch';
import { ElasticSearch } from './elasticsearch';
import { AxiosService } from './services/axios';
import { AuthController } from './controllers/auth/AuthController';
import { AuthService } from './services/api/auth.service';
import { HealthController } from './controllers/health/HealthController';
import { AuthMiddleware } from './services/auth-middleware';
import { CurrentUserController } from './controllers/auth/CurrentUserController';

async function initialize(): Promise<void> {
  const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'GatewayServer', 'debug');
  const esClient: Client = new Client({ node: `${config.ELASTIC_SEARCH_URL}` });
  const elasticSearch: ElasticSearch = new ElasticSearch(esClient, log);
  await elasticSearch.checkConnection();

  const app = express();

  const axiosAuthService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth', config);
  const authService = new AuthService(axiosAuthService);
  const authController = new AuthController(authService);
  const healthController = new HealthController();

  const authMiddleware = new AuthMiddleware();
  const currentUserController = new CurrentUserController(authService, authMiddleware);

  const gatewayServer = new GatewayServer(
    app,
    log,
    [authController, healthController, currentUserController],
    axiosAuthService);
  await gatewayServer.start();
}

initialize()
