"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET;
if (!secret) {
    throw new Error("JWT secret is not defined in the environment variables");
}
const authenticateToken = async (c, next) => {
    const authHeader = c.req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, secret);
        c.set('user', user);
        await next();
    }
    catch (error) {
        return c.json({ error: 'Forbidden' }, 403);
    }
};
exports.authenticateToken = authenticateToken;
