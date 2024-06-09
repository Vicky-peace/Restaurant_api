import { Hono } from "hono";
import { listStatusCatalogs, getSingleStatusCatalog, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog } from "./status.controller";

export const statusCatalogRouter = new Hono();

statusCatalogRouter.get('/status-catalogs', listStatusCatalogs);
statusCatalogRouter.get('/status-catalogs/:id', getSingleStatusCatalog);
statusCatalogRouter.post('/status-catalogs', createStatusCatalog);
statusCatalogRouter.put('/status-catalogs/:id', updateStatusCatalog);
statusCatalogRouter.delete('/status-catalogs/:id', deleteStatusCatalog);
