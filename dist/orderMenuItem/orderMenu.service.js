"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getSingleOrderMenuItemService = exports.getOrderMenuItemsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getOrderMenuItemsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.OrderMenuItem.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.OrderMenuItem.findMany();
};
exports.getOrderMenuItemsService = getOrderMenuItemsService;
const getSingleOrderMenuItemService = async (id) => {
    const orderMenuItem = await db_1.db.query.OrderMenuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id)
    });
    return orderMenuItem ?? null;
};
exports.getSingleOrderMenuItemService = getSingleOrderMenuItemService;
const createOrderMenuItemService = async (orderMenuItem) => {
    await db_1.db.insert(schema_1.OrderMenuItem).values(orderMenuItem);
    return "Order menu item created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    await db_1.db.update(schema_1.OrderMenuItem).set(orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id));
    return "Order menu item updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
const deleteOrderMenuItemService = async (id) => {
    await db_1.db.delete(schema_1.OrderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id));
    return "Order menu item deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
