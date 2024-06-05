import { Hono } from "hono";
import { getUser, listUsers } from "./user.controller";
export const userRouter = new Hono();

//get all users
userRouter.get("/users", listUsers);

//get a single user by id
userRouter.get("/users/:id",getUser)