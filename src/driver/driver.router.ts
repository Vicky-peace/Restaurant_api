import { Hono } from "hono";
import { listDrivers, getSingleDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller";

export const driverRouter = new Hono();

driverRouter.get('/drivers', listDrivers);
driverRouter.get('/drivers/:id', getSingleDriver);
driverRouter.post('/drivers', createDriver);
driverRouter.put('/drivers/:id', updateDriver);
driverRouter.delete('/drivers/:id', deleteDriver);
