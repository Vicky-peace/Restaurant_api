import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import { Users, AuthOnUsersTable, TSAuthOnUsersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { userSchema, authOnUsersSchema, loginSchema } from '../validator'; // Import the Zod schemas
import { UserInfo } from 'os';

const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRES;

export const registerUser = async (user: TSAuthOnUsersTable | UserInfo) => {
    // Validate user data against the Users and AuthOnUsersTable schemas
    userSchema.parse(user);
    authOnUsersSchema.parse(user);

    // Check if the user already exists
    const existingUser = await db.query.Users.findFirst({
        where: eq(Users.email, user.email),
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Insert data into the Users table
    const [newUser] = await db
        .insert(Users)
        .values({
            name: user.name,
            contact_phone: user.contact_phone,
            phone_verified: user.phone_verified,
            email: user.email,
            email_verified: user.email_verified,
            confirmation_code: user.confirmation_code,
            password: hashedPassword,
        })
        .returning({ id: Users.id })
        .execute();

    // Insert data into the AuthOnUsersTable table
    await db
        .insert(AuthOnUsersTable)
        .values({
            userId: newUser.id,
            email: user.email,
            password: hashedPassword,
            role: user.role,
        })
        .execute();

    return 'User registered successfully';
};

export const loginUser = async (email: string, password: string) => {
    // Validate login data against the login schema
    loginSchema.parse({ email, password });

    const user = await db.query.Users.findFirst({
        where: eq(AuthOnUsersTable.email, email),
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
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