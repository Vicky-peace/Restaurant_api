import { Hono } from 'hono';
import { register, login } from './auth.controller';


export const authRouter = new Hono();

authRouter.post('/register', register);
authRouter.post('/login', login);

