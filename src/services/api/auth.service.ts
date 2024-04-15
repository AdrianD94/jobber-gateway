import { AxiosResponse } from "axios";
import { AxiosService } from "@gateway/services/axios";
import { IAuth } from "@adriand94/jobber-shared";
export class AuthService {
    constructor(private axiosService: AxiosService) { }
    async signUp(body: IAuth): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.post('/signup', body);
        return response;
    }
    async signIn(body: IAuth): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.post('/signin', body);
        return response;
    }
    async verifyEmail(token: string): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.put('/verify-email', { token });
        return response;
    }
    async forgotPassword(email: string): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.put('/forgot-password', { email });
        return response;
    }
    async resetPassword(token: string, password: string, confirmPassword: string): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.put(`/reset-password/${token}`, { password, confirmPassword });
        return response;
    }
    async changePassword( currentPassword: string, newPassword: string): Promise<AxiosResponse> {
        const response = await this.axiosService.axios.put(`/change-password`, { currentPassword, newPassword });
        return response;
    }
    async getCurrentUser(): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosService.axios.get('/current-user');
        return response;
      }

      async resendEmail(data: { userId: number, email: string }): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosService.axios.post('/resend-email', data);
        return response;
      }
      async getRefreshToken(username: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosService.axios.get(`/refresh-token/${username}`);
        return response;
      }
}