import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const videoRoutes = Router();
videoRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

videoRoutes.route("/").post(createTweet);
videoRoutes.route("/user/:userId").get(getUserTweets);
videoRoutes.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default videoRoutes