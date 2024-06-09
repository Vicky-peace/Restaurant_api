"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const user_controller_1 = require("./user.controller");
exports.userRouter = new hono_1.Hono();
//get all users
exports.userRouter.get("/users", user_controller_1.listUsers);
//get a single user by id
exports.userRouter.get("/users/:id", user_controller_1.getUser);
//create a user
// userRouter.post("users", zValidator("json",userSchema, (result, c) => {
//     if(!result.success){
//         return c.json(result.error, 400)
//     }
// }), createUser)
//update a user
exports.userRouter.put("/users/:id", user_controller_1.updateUser);
//delete a user
exports.userRouter.delete("/users/:id", user_controller_1.deleteUser);
