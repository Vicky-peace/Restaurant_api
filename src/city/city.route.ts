import { Hono } from "hono";
import { listCities, getSingleCity, createCity, updateCity, deleteCity } from "./city.controller";

export const cityRouter = new Hono();

cityRouter.get('/cities', listCities);
cityRouter.get('/cities/:id', getSingleCity);
cityRouter.post('/cities', createCity);
cityRouter.put('/cities/:id', updateCity);
cityRouter.delete('/cities/:id', deleteCity);
