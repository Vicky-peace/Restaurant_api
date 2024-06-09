import { Hono } from 'hono';
import { register, login } from './auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

export const authRouter = new Hono();

authRouter.post('/register', register);
authRouter.post('/login', login);

// Example of a protected route
authRouter.get('/protected', authenticateToken, (c) => {
  return c.json({ msg: 'This is a protected route' }, 200);
});
