"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.authRouter = new hono_1.Hono();
exports.authRouter.post('/register', auth_controller_1.register);
exports.authRouter.post('/login', auth_controller_1.login);
// Example of a protected route
exports.authRouter.get('/protected', auth_middleware_1.authenticateToken, (c) => {
    return c.json({ msg: 'This is a protected route' }, 200);
});
