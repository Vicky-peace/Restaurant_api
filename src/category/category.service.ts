import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Category, TSCategory, TICategory } from "../drizzle/schema";

export const getCategoriesService = async (limit?: number): Promise<TSCategory[]> => {
    if (limit) {
        return await db.query.Category.findMany({
            limit: limit
        });
    }
    return await db.query.Category.findMany();
};

export const getSingleCategoryService = async (id: number): Promise<TSCategory | null> => {
    const category = await db.query.Category.findFirst({
        where: eq(Category.id, id)
    });
    return category ?? null;
};

export const createCategoryService = async (category: TSCategory) => {
    await db.insert(Category).values(category);
    return "Category created successfully";
};

export const updateCategoryService = async (id: number, category: TICategory) => {
    await db.update(Category).set(category).where(eq(Category.id, id));
    return "Category updated successfully";
};

export const deleteCategoryService = async (id: number) => {
    await db.delete(Category).where(eq(Category.id, id));
    return "Category deleted successfully";
};
