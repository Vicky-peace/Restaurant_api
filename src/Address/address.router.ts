import { Hono } from "hono";
import { listAddresses, getSingleAddress, createAddress, updateAddress, deleteAddress } from "./address.controller";
import { adminRoleAuth, adminOrUserAuth, userRoleAuth } from "../middlewares/authorizeRole";

export const addressRouter = new Hono();

addressRouter.get('/addresses', userRoleAuth, listAddresses);
addressRouter.get('/addresses/:id', userRoleAuth, getSingleAddress);
addressRouter.post('/addresses', userRoleAuth, createAddress);
addressRouter.put('/addresses/:id', adminRoleAuth, updateAddress);
addressRouter.delete('/addresses/:id',adminRoleAuth, deleteAddress);
