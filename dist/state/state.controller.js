"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.createState = exports.getSingleState = exports.listStates = void 0;
const state_service_1 = require("./state.service");
const listStates = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, state_service_1.getStatesService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listStates = listStates;
const getSingleState = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, state_service_1.getSingleStateService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleState = getSingleState;
const createState = async (c) => {
    try {
        const state = await c.req.json();
        const createdState = await (0, state_service_1.createStateService)(state);
        if (!createdState)
            return c.text('State not created', 400);
        return c.json({ msg: createdState }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createState = createState;
const updateState = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const state = await c.req.json();
        const updatedState = await (0, state_service_1.updateStateService)(id, state);
        if (!updatedState)
            return c.text('State not updated', 400);
        return c.json({ msg: updatedState }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateState = updateState;
const deleteState = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedState = await (0, state_service_1.deleteStateService)(id);
        if (!deletedState)
            return c.text('State not deleted', 400);
        return c.json({ msg: deletedState }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteState = deleteState;
