"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateService = exports.updateStateService = exports.createStateService = exports.getSingleStateService = exports.getStatesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getStatesService = async (limit) => {
    if (limit) {
        return await db_1.db.query.State.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.State.findMany();
};
exports.getStatesService = getStatesService;
const getSingleStateService = async (id) => {
    const state = await db_1.db.query.State.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.State.id, id)
    });
    return state ?? null;
};
exports.getSingleStateService = getSingleStateService;
const createStateService = async (state) => {
    await db_1.db.insert(schema_1.State).values(state);
    return "State created successfully";
};
exports.createStateService = createStateService;
const updateStateService = async (id, state) => {
    await db_1.db.update(schema_1.State).set(state).where((0, drizzle_orm_1.eq)(schema_1.State.id, id));
    return "State updated successfully";
};
exports.updateStateService = updateStateService;
const deleteStateService = async (id) => {
    await db_1.db.delete(schema_1.State).where((0, drizzle_orm_1.eq)(schema_1.State.id, id));
    return "State deleted successfully";
};
exports.deleteStateService = deleteStateService;
