import { Hono } from "hono";
import { listStates, getSingleState, createState, updateState, deleteState } from "./state.controller";

export const stateRouter = new Hono();

stateRouter.get('/states', listStates);
stateRouter.get('/states/:id', getSingleState);
stateRouter.post('/states', createState);
stateRouter.put('/states/:id', updateState);
stateRouter.delete('/states/:id', deleteState);
