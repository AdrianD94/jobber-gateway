import { AxiosResponse } from "axios";
import { AxiosService } from "@gateway/services/axios";
import { IAuth } from "@adriand94/jobber-shared";
export class AuthService {
    constructor(private axiosService: AxiosService) { }
    async signUp(body: IAuth): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.post('/signup', body);
        return response;
    }
}