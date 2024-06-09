"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.createOrderStatusService = exports.getOrderStatusService = exports.orderStatusService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const orderStatusService = async (limit) => {
    if (limit) {
        return await db_1.db.query.OrderStatus.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.OrderStatus.findMany();
};
exports.orderStatusService = orderStatusService;
const getOrderStatusService = async (id) => {
    return await db_1.db.query.OrderStatus.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id)
    });
};
exports.getOrderStatusService = getOrderStatusService;
const createOrderStatusService = async (order) => {
    await db_1.db.insert(schema_1.OrderStatus).values(order);
    return "OrderStatus created successfully";
};
exports.createOrderStatusService = createOrderStatusService;
const updateOrderStatusService = async (id, order) => {
    await db_1.db.update(schema_1.OrderStatus).set(order).where((0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id));
    return "OrderStatus updated successfully";
};
exports.updateOrderStatusService = updateOrderStatusService;
const deleteOrderStatusService = async (id) => {
    await db_1.db.delete(schema_1.OrderStatus).where((0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id));
    return "OrderStatus deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
