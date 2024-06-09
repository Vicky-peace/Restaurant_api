"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRES;
const registerUser = async (user) => {
    //check if the user already exists
    const existingUser = await db_1.db.query.Users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Users.email, user.email)
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    //Hash the password
    const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
    await db_1.db.insert(schema_1.Users).values({ ...user, password: hashedPassword });
    return 'User registered successfully';
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await db_1.db.query.Users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Users.email, email)
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, { expiresIn });
    return { token, user };
};
exports.loginUser = loginUser;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
