"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalog = exports.updateStatusCatalog = exports.createStatusCatalog = exports.getSingleStatusCatalog = exports.listStatusCatalogs = void 0;
const status_service_1 = require("./status.service");
const listStatusCatalogs = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, status_service_1.getStatusCatalogsService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listStatusCatalogs = listStatusCatalogs;
const getSingleStatusCatalog = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, status_service_1.getSingleStatusCatalogService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleStatusCatalog = getSingleStatusCatalog;
const createStatusCatalog = async (c) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await (0, status_service_1.createStatusCatalogService)(statusCatalog);
        if (!createdStatusCatalog)
            return c.text('Status catalog not created', 400);
        return c.json({ msg: createdStatusCatalog }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createStatusCatalog = createStatusCatalog;
const updateStatusCatalog = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const statusCatalog = await c.req.json();
        const updatedStatusCatalog = await (0, status_service_1.updateStatusCatalogService)(id, statusCatalog);
        if (!updatedStatusCatalog)
            return c.text('Status catalog not updated', 400);
        return c.json({ msg: updatedStatusCatalog }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateStatusCatalog = updateStatusCatalog;
const deleteStatusCatalog = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedStatusCatalog = await (0, status_service_1.deleteStatusCatalogService)(id);
        if (!deletedStatusCatalog)
            return c.text('Status catalog not deleted', 400);
        return c.json({ msg: deletedStatusCatalog }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteStatusCatalog = deleteStatusCatalog;
