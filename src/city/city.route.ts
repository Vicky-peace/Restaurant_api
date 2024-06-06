import { Hono } from "hono";
import { listCities } from "./city.controller"; 


export const cityRouter = new Hono();

//get all cities
cityRouter.get("/cities", listCities);