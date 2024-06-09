"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.createMenuItemService = exports.getSingleMenuItemService = exports.getMenuItemsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getMenuItemsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.MenuItem.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.MenuItem.findMany();
};
exports.getMenuItemsService = getMenuItemsService;
const getSingleMenuItemService = async (id) => {
    const menuItem = await db_1.db.query.MenuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id)
    });
    return menuItem ?? null;
};
exports.getSingleMenuItemService = getSingleMenuItemService;
const createMenuItemService = async (menuItem) => {
    await db_1.db.insert(schema_1.MenuItem).values(menuItem);
    return "Menu item created successfully";
};
exports.createMenuItemService = createMenuItemService;
const updateMenuItemService = async (id, menuItem) => {
    await db_1.db.update(schema_1.MenuItem).set(menuItem).where((0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id));
    return "Menu item updated successfully";
};
exports.updateMenuItemService = updateMenuItemService;
const deleteMenuItemService = async (id) => {
    await db_1.db.delete(schema_1.MenuItem).where((0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id));
    return "Menu item deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
