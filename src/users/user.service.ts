import { TIUser, TSUser, TIAddress, TSAddress, TICity, TSCity, TIState, TSState, TIRestaurant, TSRestaurant, TICategory, TSCategory, TIMenuItem, TSMenuItem, TIOrder, TSOrder, TIOrderMenuItem, TSOrderMenuItem, TIOrderStatus, TSOrderStatus, TSStatusCatalog, TIStatusCatalog, TIComment, TSComment, TIDriver, TIRestaurantOwner, TSRestaurantOwner, Users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Context } from "hono";

export const userService = async (limit?: number) : Promise<TSUser[] | null> =>{
    if(limit){
        return await db.query.Users.findMany({
            limit: limit
        });
    }
    return await db.query.Users.findMany();
}

export const getUserService = async (id: number): Promise<TIUser | undefined> => {
  return await db.query.Users.findFirst({
    where: eq(Users.id, id),
  })
}

// export const createUserService = async (user: TIUser) => {
//     await db.insert(Users).values(user)
//     return "User created successfully";
// }

export const updateUserService = async (id: number, user: TIUser) => {
  await db.update(Users).set(user).where(eq(Users.id, id))
  return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
  await db.delete(Users).where(eq(Users.id, id))
  return "User deleted successfully";
}