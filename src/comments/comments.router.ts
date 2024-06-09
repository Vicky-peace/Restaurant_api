import { Hono } from "hono";
import { listComments, getSingleComment, createComment, updateComment, deleteComment } from "./comments.controller";

export const commentRouter = new Hono();

commentRouter.get('/comments', listComments);
commentRouter.get('/comments/:id', getSingleComment);
commentRouter.post('/comments', createComment);
commentRouter.put('/comments/:id', updateComment);
commentRouter.delete('/comments/:id', deleteComment);
