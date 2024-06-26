import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import {  AuthOnUsersTable,Users, TSUser, TIUser} from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import {userSchema, authOnUsersSchema, loginSchema } from '../validator'; // Import the Zod schemas
import { sendEmail, sendRegistrationEmail } from '../nodeMailer/mailer';




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
                userId: userId, 
                password: hashedPassword,
                email: user.email,
                role: user.role || 'user', // Default role if not provided
            })
            .execute();

            //send a registration email
            const emailSubject = "Welcome to Our Restaurant Platform!";
            const evetName = "Our Restaurant Platform";
            const emailResponse = await sendRegistrationEmail(user.email, evetName);
            console.log(emailResponse);

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


    // Fetch the user's role from the auth_on_users table
    const userRole = await db.query.AuthOnUsersTable.findFirst({
        where: eq(AuthOnUsersTable.userId, user.id),
    });
   
    if (!userRole) {
        throw new Error('User role not found! Please contact support.');
    }
  

    const token = jwt.sign({ id: user.id, email: user.email, role: userRole.role}, secret!, { expiresIn });

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

// export const requestPasswordReset = async (email: string) => {
//     const user = await db.select().from(Users).where(eq(Users.email, email)).execute();
//     if(!user){
//         throw new Error('User not found');
//     }

//     const resetToken = crypto.randomUUID();
//     const expireToken = Date.now() + 3600000; // 1 hour


//     await db.update(Users).set({resetToken,  expireToken}).where(eq(Users.email, email)).execute();
//     const resetUrl = `http://localhost:8080/reset/${resetToken}`;

//     await sendEmail(
//         email, 'Password Reset',
//       `Click on the link to reset your password: ${resetUrl}`);

//       return resetUrl;
// };

// export const resetPassword = async (token: string, newPassword: string) => {
//     const user = await db.select().from(Users).where({ resetToken: token, expireToken: { $gt: Date.now() } }).first();
//     if (!user) {
//         throw new Error("Token is invalid or has expired");
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await db.update('Users').set({ password: hashedPassword, resetToken: null, expireToken: null }).where({ id: user.id });

//     return "Password has been successfully reset";
// };