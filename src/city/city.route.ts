import { Hono } from "hono";
import { listCities,getCityById } from "./city.controller"; 


export const cityRouter = new Hono();

//get all cities
cityRouter.get("/cities", listCities);
cityRouter.get("/cities/:id", getCityById);