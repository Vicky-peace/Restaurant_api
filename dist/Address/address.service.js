"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.updateAddressService = exports.createAddressService = exports.getSingleAddressService = exports.getAddressesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getAddressesService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Address.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Address.findMany();
};
exports.getAddressesService = getAddressesService;
const getSingleAddressService = async (id) => {
    const address = await db_1.db.query.Address.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Address.id, id)
    });
    return address ?? null;
};
exports.getSingleAddressService = getSingleAddressService;
const createAddressService = async (address) => {
    await db_1.db.insert(schema_1.Address).values(address);
    return "Address created successfully";
};
exports.createAddressService = createAddressService;
const updateAddressService = async (id, address) => {
    await db_1.db.update(schema_1.Address).set(address).where((0, drizzle_orm_1.eq)(schema_1.Address.id, id));
    return "Address updated successfully";
};
exports.updateAddressService = updateAddressService;
const deleteAddressService = async (id) => {
    await db_1.db.delete(schema_1.Address).where((0, drizzle_orm_1.eq)(schema_1.Address.id, id));
    return "Address deleted successfully";
};
exports.deleteAddressService = deleteAddressService;
