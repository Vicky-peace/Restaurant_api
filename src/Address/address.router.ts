import { Hono } from "hono";
import { listAddresses, getSingleAddress, createAddress, updateAddress, deleteAddress } from "./address.controller";

export const addressRouter = new Hono();

addressRouter.get('/addresses', listAddresses);
addressRouter.get('/addresses/:id', getSingleAddress);
addressRouter.post('/addresses', createAddress);
addressRouter.put('/addresses/:id', updateAddress);
addressRouter.delete('/addresses/:id', deleteAddress);
