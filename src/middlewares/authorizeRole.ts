import "dotenv/config";
import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import jwt from "jsonwebtoken";

export const verifyToken = async (token: string, secret: string) => {
    try{
        const decoded = await verify(token as string, secret);
        return decoded;

    } catch(error: any){
        throw new Error("Invalid token");
    }
}




export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) {
        console.log("No token provided");
        return c.json({ error: "Unauthorized Invalid token" }, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET as string) as any;

        if (!decoded) {
            console.log("Token verification failed");
            return c.json({ error: "Forbidden" }, 403);
        }

        if (decoded.role !== requiredRole) {
            console.log(`Role mismatch: required ${requiredRole}, found ${decoded.role}`);
            return c.json({ error: "Unauthorized" }, 401);
        }

        console.log("Token and role verified successfully");
        return next();
    } catch (error) {
        console.log("Error verifying token:", error);
        return c.json({ error: "Unauthorized Invalid token" }, 401);
    }
};

export const adminRoleAuth = async (c: Context, next: Next) =>  await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) =>  await authMiddleware(c, next, "user");