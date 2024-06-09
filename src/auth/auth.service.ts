import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import  db from "../drizzle/db";
import { Users,TSUser, TIUser } from '../drizzle/schema';
import {eq} from 'drizzle-orm';


const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRES

export const registerUser = async (user: TSUser) =>{
    //check if the user already exists
    const existingUser = await db.query.Users.findFirst({
        where: eq(Users.email, user.email)
    });

    if (existingUser){
        throw new Error('User already exists');
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.insert(Users).values({...user, password: hashedPassword});
    return 'User registered successfully';
};


export const loginUser = async(email: string, password: string) =>{
    const user = await db.query.Users.findFirst({
        where: eq(Users.email, email)
    });
    if(!user){
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error('Invalid password');
    }
    const token = jwt.sign({id: user.id, email: user.email}, secret!, {expiresIn});
    return {token, user};
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret!);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

