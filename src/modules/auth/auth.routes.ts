import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/password/forgot', forgotPassword);
AuthRouter.post('/password/reset', resetPassword);

export default AuthRouter;

