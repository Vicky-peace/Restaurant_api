import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import {  AuthOnUsersTable,Users, TSUser, TIUser} from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import {userSchema, authOnUsersSchema, loginSchema } from '../validator'; // Import the Zod schemas




const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRES;

export const registerUser = async (user: any) => {
    // Validate user data against the Users and AuthOnUsersTable schemas
    userSchema.parse(user);
    authOnUsersSchema.parse(user);

    // Check if the user already exists
    const existingUser = await db.select().from(Users).where(eq(Users.email, user.email)).execute();

    if (existingUser.length > 0) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Insert data into the Users table
    const newUser = await db
        .insert(Users)
        .values({
            name: user.name,
            contact_phone: user.contact_phone || null,
            phone_verified: user.phone_verified || false,
            email: user.email,
            email_verified: user.email_verified || false,
            confirmation_code: user.confirmation_code || null,
            password: hashedPassword,
        })
        .returning({ id: Users.id })
        .execute();

    const userId = newUser[0].id;

    try {
        // Insert data into the AuthOnUsersTable
        await db
            .insert(AuthOnUsersTable)
            .values({
                userId: userId, // Make sure this matches the column name in the table definition
                password: hashedPassword,
                email: user.email,
                role: user.role || 'user', // Default role if not provided
            })
            .execute();

        return 'User registered successfully';
    } catch (error) {
        // Rollback: delete the user from the Users table if the second insert fails
        await db.delete(Users).where(eq(Users.id, userId)).execute();
        throw new Error('Registration failed. Please try again.');
    }
};


export const loginUser = async (email: string, password: string) => {
    // Validate login data against the login schema
    loginSchema.parse({ email, password });

    const user = await db.query.Users.findFirst({
        where: eq(Users.email, email),
    });

    if (!user) {
        throw new Error('Invalid credentials! Try again');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials! Try again');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret!, { expiresIn });

    return { token, user };
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret!);
    } catch (error) {
        throw new Error('Invalid token');
    }
};


// There is a bug on register user function, can you find it? 🤔