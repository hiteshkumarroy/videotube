import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const videoRoutes = Router();
videoRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

videoRoutes
    .route("/")
    .get(getAllVideos)
   

videoRoutes
    .route("/publish")
     .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

videoRoutes
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

videoRoutes.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default videoRoutes