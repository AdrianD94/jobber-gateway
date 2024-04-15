import 'express-async-errors'
import express from 'express';
import { GatewayServer } from './server';
import { winstonLogger } from '@adriand94/jobber-shared';
import { Logger } from 'winston';
import { config } from '@gateway/config';
import { Client } from '@elastic/elasticsearch';
import { ElasticSearch } from './elasticsearch';

async function initialize(): Promise<void> {
  const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'GatewayServer', 'debug');
  const esClient: Client = new Client({ node: `${config.ELASTIC_SEARCH_URL}` });
  const elasticSearch: ElasticSearch = new ElasticSearch(esClient, log);
  await elasticSearch.checkConnection();

  const app = express();
  const gatewayServer = new GatewayServer(app, log);
  await gatewayServer.start();
}

initialize()
