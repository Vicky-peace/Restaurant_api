import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Comment, TSComment, TIComment } from "../drizzle/schema";

export const getCommentsService = async (limit?: number): Promise<TSComment[]> => {
    if (limit) {
        return await db.query.Comment.findMany({
            limit: limit
        });
    }
    return await db.query.Comment.findMany();
};

export const getSingleCommentService = async (id: number): Promise<TSComment | null> => {
    const comment = await db.query.Comment.findFirst({
        where: eq(Comment.id, id)
    });
    return comment ?? null;
};

export const createCommentService = async (comment: TSComment) => {
    await db.insert(Comment).values(comment);
    return "Comment created successfully";
};

export const updateCommentService = async (id: number, comment: TIComment) => {
    await db.update(Comment).set(comment).where(eq(Comment.id, id));
    return "Comment updated successfully";
};

export const deleteCommentService = async (id: number) => {
    await db.delete(Comment).where(eq(Comment.id, id));
    return "Comment deleted successfully";
};
