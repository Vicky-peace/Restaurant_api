import { Context } from "hono";
import { getCommentsService, getSingleCommentService, createCommentService, updateCommentService, deleteCommentService } from "./comments.service";

export const listComments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getCommentsService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleComment = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleCommentService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createComment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdComment = await createCommentService(comment);

        if (!createdComment) return c.text('Comment not created', 400);
        return c.json({ msg: createdComment }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateComment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const comment = await c.req.json();
        const updatedComment = await updateCommentService(id, comment);

        if (!updatedComment) return c.text('Comment not updated', 400);
        return c.json({ msg: updatedComment }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteComment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedComment = await deleteCommentService(id);

        if (!deletedComment) return c.text('Comment not deleted', 400);
        return c.json({ msg: deletedComment }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
