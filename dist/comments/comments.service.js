"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.createCommentService = exports.getSingleCommentService = exports.getCommentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getCommentsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Comment.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Comment.findMany();
};
exports.getCommentsService = getCommentsService;
const getSingleCommentService = async (id) => {
    const comment = await db_1.db.query.Comment.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Comment.id, id)
    });
    return comment ?? null;
};
exports.getSingleCommentService = getSingleCommentService;
const createCommentService = async (comment) => {
    await db_1.db.insert(schema_1.Comment).values(comment);
    return "Comment created successfully";
};
exports.createCommentService = createCommentService;
const updateCommentService = async (id, comment) => {
    await db_1.db.update(schema_1.Comment).set(comment).where((0, drizzle_orm_1.eq)(schema_1.Comment.id, id));
    return "Comment updated successfully";
};
exports.updateCommentService = updateCommentService;
const deleteCommentService = async (id) => {
    await db_1.db.delete(schema_1.Comment).where((0, drizzle_orm_1.eq)(schema_1.Comment.id, id));
    return "Comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
