import { Router } from 'express';
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controllers.js"
import {jwtVerify} from "../middlewares/auth.middlewares.js"

const playlistRoutes = Router();

playlistRoutes.use(jwtVerify); // Apply verifyJWT middleware to all routes in this file

playlistRoutes.route("/").post(createPlaylist)

playlistRoutes
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

playlistRoutes.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
playlistRoutes.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

playlistRoutes.route("/user/:userId").get(getUserPlaylists);

export default playlistRoutes