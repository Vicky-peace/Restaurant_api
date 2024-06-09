"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getSingleComment = exports.listComments = void 0;
const comments_service_1 = require("./comments.service");
const listComments = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, comments_service_1.getCommentsService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listComments = listComments;
const getSingleComment = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, comments_service_1.getSingleCommentService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleComment = getSingleComment;
const createComment = async (c) => {
    try {
        const comment = await c.req.json();
        const createdComment = await (0, comments_service_1.createCommentService)(comment);
        if (!createdComment)
            return c.text('Comment not created', 400);
        return c.json({ msg: createdComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createComment = createComment;
const updateComment = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const comment = await c.req.json();
        const updatedComment = await (0, comments_service_1.updateCommentService)(id, comment);
        if (!updatedComment)
            return c.text('Comment not updated', 400);
        return c.json({ msg: updatedComment }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateComment = updateComment;
const deleteComment = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedComment = await (0, comments_service_1.deleteCommentService)(id);
        if (!deletedComment)
            return c.text('Comment not deleted', 400);
        return c.json({ msg: deletedComment }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteComment = deleteComment;
