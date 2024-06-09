"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (c) => {
    try {
        const user = await c.req.json();
        const message = await (0, auth_service_1.registerUser)(user);
        return c.json({ msg: message }, 201);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.register = register;
const login = async (c) => {
    try {
        const { email, password } = await c.req.json();
        const { token, user } = await (0, auth_service_1.loginUser)(email, password);
        return c.json({ token, user }, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.login = login;
