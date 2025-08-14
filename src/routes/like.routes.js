import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
} from "../controllers/like.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const likeRoutes = Router();
likeRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

likeRoutes.route("/toggle/v/:videoId").post(toggleVideoLike);
likeRoutes.route("/toggle/c/:commentId").post(toggleCommentLike);
likeRoutes.route("/toggle/t/:tweetId").post(toggleTweetLike);
likeRoutes.route("/videos").get(getLikedVideos);

export default likeRoutes