import { Hono } from "hono";
import { getUser, listUsers, updateUser, deleteUser } from "./user.controller";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middlewares/authorizeRole";
export const userRouter = new Hono();

//get all users
userRouter.get("/users",adminRoleAuth, listUsers);

//get a single user by id
userRouter.get("/users/:id",adminRoleAuth,getUser)


//create a user
// userRouter.post("users", zValidator("json",userSchema, (result, c) => {
//     if(!result.success){
//         return c.json(result.error, 400)
//     }
// }), createUser)


//update a user
userRouter.put("/users/:id", updateUser);

//delete a user
userRouter.delete("/users/:id", deleteUser);