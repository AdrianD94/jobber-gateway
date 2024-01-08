import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { ClusterHealthHealthResponseBody } from '@elastic/elasticsearch/lib/api/types';


export class ElasticSearch {
  constructor(private elasticSearchClient: Client, private log: Logger) { }
  public async checkConnection(): Promise<void> {

    let isConnected: boolean = false;
    let attemptNr: number = 0;

    while (!isConnected && attemptNr < 3) {
      try {
        const health: ClusterHealthHealthResponseBody = await this.elasticSearchClient.cluster.health({});
        this.log.info(`Gateway ElasticSearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        this.log.error('Connection to ElasticSearch failed. Retrying....');
        this.log.log('error', 'Gateway checkConenction() method:', error);
        isConnected = false;
        attemptNr++;
      }
    }
  }
}
