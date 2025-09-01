import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const dashboardRoutes = Router();

dashboardRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

dashboardRoutes.route("/stats").get(getChannelStats);
dashboardRoutes.route("/videos").get(getChannelVideos);

export default dashboardRoutes