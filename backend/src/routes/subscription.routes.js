import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const subscriptionRoutes = Router();
subscriptionRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

subscriptionRoutes
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

subscriptionRoutes.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default subscriptionRoutes