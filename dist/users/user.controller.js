"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = void 0;
const user_service_1 = require("./user.service");
const listUsers = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, user_service_1.userService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listUsers = listUsers;
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, user_service_1.getUserService)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
// export const createUser = async (c: Context) =>{
//     try{
//         const user = await c.req.json();
//         //check if the user already exists by email
//         // const existingUser = await db.select(Users).where(Users.email.eq(user.email)).execute();
//         // if(existingUser.length > 0){
//         //     return c.text("User already exists", 409);
//         // }
//         const createdUser = await createUserService(user);
//         if(!createdUser) return c.text("User not created", 404);
//         return c.json({msg: createdUser}, 201);
//     }catch(error: any){
//         return c.json({error: error?.message}, 400)
//     }
// }
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        //search user
        const searchUser = await (0, user_service_1.getUserService)(id);
        if (searchUser == undefined) {
            return c.text("User not found", 404);
        }
        //update user
        const res = await (0, user_service_1.updateUserService)(id, user);
        //success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search user
        const searchUser = await (0, user_service_1.getUserService)(id);
        if (searchUser == undefined) {
            return c.text("User not found", 404);
        }
        //delete user
        const res = await (0, user_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
