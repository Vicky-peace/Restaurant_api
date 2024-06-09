"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getOrderService = exports.OrdersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
//get all orders
const OrdersService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Orders.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Orders.findMany();
};
exports.OrdersService = OrdersService;
//get a single order
const getOrderService = async (id) => {
    return await db_1.db.query.Orders.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Orders.id, id)
    });
};
exports.getOrderService = getOrderService;
//create a new order
const createOrderService = async (data) => {
    await db_1.db.insert(schema_1.Orders).values(data);
    return "Order created successfully";
};
exports.createOrderService = createOrderService;
//update an order
const updateOrderService = async (id, data) => {
    await db_1.db.update(schema_1.Orders).set(data).where((0, drizzle_orm_1.eq)(schema_1.Orders.id, id));
    return "Order updated successfully";
};
exports.updateOrderService = updateOrderService;
//delete an order
const deleteOrderService = async (id) => {
    await db_1.db.delete(schema_1.Orders).where((0, drizzle_orm_1.eq)(schema_1.Orders.id, id));
    return "Order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
