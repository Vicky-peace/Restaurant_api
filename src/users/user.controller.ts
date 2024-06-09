import { Context } from "hono";
import {userService,getUserService,updateUserService, deleteUserService} from './user.service';
import { TIUser, Users } from "../drizzle/schema";
import {db} from "../drizzle/db";
import {eq} from 'drizzle-orm';

export const listUsers = async (c: Context) =>{
    try{
        const limit = Number(c.req.query('limit'))

        const data = await userService(limit);
        if(data == null || data.length == 0){
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}

export const getUser = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserService(id);
    if(user == undefined){
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
}


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


export const updateUser = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try{
        //search user
        const searchUser = await  getUserService(id);
        if(searchUser == undefined){
            return c.text("User not found", 404);
        }
        //update user
        const res = await updateUserService(id, user);
        //success message
        if(!res) return c.text("User not updated", 404);

        return c.json({msg: res}, 201);
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}

export const deleteUser = async (c: Context) =>{
    const id = Number(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);

    try{
        //search user
        const searchUser = await  getUserService(id);
        if(searchUser == undefined){
            return c.text("User not found", 404);
        }
        //delete user
        const res = await deleteUserService(id);
        if(!res) return c.text("User not deleted", 404);

        return c.json({msg: res}, 201);

    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}