import { Hono } from "hono";
import { listCategories, getSingleCategory, createCategory, updateCategory, deleteCategory } from "./category.controller";

export const categoryRouter = new Hono();

categoryRouter.get('/categories', listCategories);
categoryRouter.get('/categories/:id', getSingleCategory);
categoryRouter.post('/categories', createCategory);
categoryRouter.put('/categories/:id', updateCategory);
categoryRouter.delete('/categories/:id', deleteCategory);
