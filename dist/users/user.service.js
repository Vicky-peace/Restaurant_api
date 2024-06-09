"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.getUserService = exports.userService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const userService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Users.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Users.findMany();
};
exports.userService = userService;
const getUserService = async (id) => {
    return await db_1.db.query.Users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Users.id, id),
    });
};
exports.getUserService = getUserService;
// export const createUserService = async (user: TIUser) => {
//     await db.insert(Users).values(user)
//     return "User created successfully";
// }
const updateUserService = async (id, user) => {
    await db_1.db.update(schema_1.Users).set(user).where((0, drizzle_orm_1.eq)(schema_1.Users.id, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.db.delete(schema_1.Users).where((0, drizzle_orm_1.eq)(schema_1.Users.id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
