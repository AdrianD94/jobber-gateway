
import { Config } from '@gateway/config';
import axios from 'axios';
import { sign } from 'jsonwebtoken';

export class Axios {
    public axios: ReturnType<typeof axios.create>;

    constructor(private baseUrl: string, private serviceName: string, private config: Config) {
        this.axios = this.axiosCreateInstance();
    }

    public axiosCreateInstance(): ReturnType<typeof axios.create> {
        let gatewayToken = '';
        if (this.serviceName) {
            gatewayToken = sign({
                id: this.serviceName
            }, `${this.config.GATEWAY_JWT_TOKEN}`)
        }
        const instance = axios.create({
            baseURL: this.baseUrl, headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                gatewayToken
            },
            withCredentials: true
        })
        return instance;
    }
}