import { Hono } from "hono";
import { listUsers } from "./user.controller";
export const userRouter = new Hono();

//get all users
userRouter.get("/users", listUsers);