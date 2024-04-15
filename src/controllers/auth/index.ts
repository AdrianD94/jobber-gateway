import { AuthService } from "@gateway/services/api/auth.service";
import { SignUpController } from "./signup";
import { AxiosService } from "@gateway/services/axios";
import { config } from "@gateway/config";
import { SignInController } from "./signin";
import { VerifyEmailController } from "./verify-email";
import { PasswordController } from "./password";
import { CurrentUserController } from "./current-user";
import { RefreshTokenController } from "./refresh-token";

const axiosAuthService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth', config);
const authService = new AuthService(axiosAuthService);
const signupController = new SignUpController(authService as AuthService);
const verifyEmailController = new VerifyEmailController(authService as AuthService);
const signInController = new SignInController(authService as AuthService);
const passwordController = new PasswordController(authService as AuthService);
const currentUserController = new CurrentUserController(authService);
const refreshTokenController = new RefreshTokenController(authService);

export { signupController, signInController, verifyEmailController, passwordController, axiosAuthService, currentUserController, refreshTokenController };