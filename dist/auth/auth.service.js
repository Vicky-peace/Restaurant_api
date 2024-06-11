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
const validator_1 = require("../validator"); // Import the Zod schemas
const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRES;
const registerUser = async (user) => {
    // Validate user data against the Users and AuthOnUsersTable schemas
    validator_1.userSchema.parse(user);
    validator_1.authOnUsersSchema.parse(user);
    // Check if the user already exists
    const existingUser = await db_1.db.select().from(schema_1.Users).where((0, drizzle_orm_1.eq)(schema_1.Users.email, user.email)).execute();
    if (existingUser.length > 0) {
        throw new Error('User already exists');
    }
    // Hash the password
    const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
    // Insert data into the Users table
    const newUser = await db_1.db
        .insert(schema_1.Users)
        .values({
        name: user.name,
        contact_phone: user.contact_phone || null,
        phone_verified: user.phone_verified || false,
        email: user.email,
        email_verified: user.email_verified || false,
        confirmation_code: user.confirmation_code || null,
        password: hashedPassword,
    })
        .returning({ id: schema_1.Users.id })
        .execute();
    const userId = newUser[0].id;
    try {
        // Insert data into the AuthOnUsersTable
        await db_1.db
            .insert(schema_1.AuthOnUsersTable)
            .values({
            userId: userId, // Make sure this matches the column name in the table definition
            password: hashedPassword,
            email: user.email,
            role: user.role || 'user', // Default role if not provided
        })
            .execute();
        return 'User registered successfully';
    }
    catch (error) {
        // Rollback: delete the user from the Users table if the second insert fails
        await db_1.db.delete(schema_1.Users).where((0, drizzle_orm_1.eq)(schema_1.Users.id, userId)).execute();
        throw new Error('Registration failed. Please try again.');
    }
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    // Validate login data against the login schema
    validator_1.loginSchema.parse({ email, password });
    const user = await db_1.db.query.Users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Users.email, email),
    });
    if (!user) {
        throw new Error('Invalid credentials! Try again');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials! Try again');
    }
    // Fetch the user's role from the auth_on_users table
    const userRole = await db_1.db.query.AuthOnUsersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.AuthOnUsersTable.userId, user.id),
    });
    if (!userRole) {
        throw new Error('User role not found! Please contact support.');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: userRole.role }, secret, { expiresIn });
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
// There is a bug on register user function, can you find it? 🤔
