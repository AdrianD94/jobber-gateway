import express from 'express';
import { GatewayServer } from './server';
import { winstonLogger } from '@adriand94/jobber-shared';
import { Logger } from 'winston';

class Application {
  public async initialize(): Promise<void> {
    const log: Logger = winstonLogger(`http://localhost:9200`, 'notificationServer', 'debug');
    const app = express();
    const gatewayServer = new GatewayServer(app, log);
    await gatewayServer.start();
  }
}

const application = new Application();
application.initialize();
