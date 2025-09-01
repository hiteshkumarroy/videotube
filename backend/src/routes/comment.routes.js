import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const commentRoutes = Router();

commentRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

commentRoutes.route("/:videoId").get(getVideoComments).post(addComment);
commentRoutes.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default commentRoutes;