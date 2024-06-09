import { Context } from "hono";
import { getCategoriesService, getSingleCategoryService, createCategoryService, updateCategoryService, deleteCategoryService } from "./category.service";

export const listCategories = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getCategoriesService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleCategory = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleCategoryService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createCategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const createdCategory = await createCategoryService(category);

        if (!createdCategory) return c.text('Category not created', 400);
        return c.json({ msg: createdCategory }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCategory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const category = await c.req.json();
        const updatedCategory = await updateCategoryService(id, category);

        if (!updatedCategory) return c.text('Category not updated', 400);
        return c.json({ msg: updatedCategory }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCategory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedCategory = await deleteCategoryService(id);

        if (!deletedCategory) return c.text('Category not deleted', 400);
        return c.json({ msg: deletedCategory }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
