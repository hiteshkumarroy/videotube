import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const commentRoutes = Router();

commentRoutes.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

commentRoutes.route("/:videoId").get(getVideoComments).post(addComment);
commentRoutes.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default commentRoutes;