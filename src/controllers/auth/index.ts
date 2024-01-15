import { AuthService } from "@gateway/services/api/auth.service";
import { SignUpController } from "./signup";
import { AxiosService } from "@gateway/services/axios";
import { Config } from "@gateway/config";

const config: Config = new Config();
const axiosAuthService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth', config);
const authService = new AuthService(axiosAuthService);
const signupController = new SignUpController(authService as AuthService);

export { signupController, axiosAuthService };