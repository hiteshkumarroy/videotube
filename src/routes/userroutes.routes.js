import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js";

import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutController, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/usercontrollers.controllers.js";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
const userRoute=Router();

userRoute.route('/register').post(
  upload.fields([
{name:"avatar",
  maxCount:1
},
{name:"coverimage",
  maxCount:1
}
]),
registerUser);

userRoute.route('/logout').post(jwtVerify,logoutController);

userRoute.route('/login').post(loginUser);
userRoute.route('/changePassword').put(jwtVerify,changeCurrentPassword);
userRoute.route('/current-user').get(jwtVerify,getCurrentUser);
userRoute.route('/updatedetails').put(jwtVerify,updateAccountDetails);
userRoute.route('/updateavatar').patch(jwtVerify,
  upload.single("avatar"),
  updateUserAvatar);
userRoute.route('/updatecoverimage').patch(jwtVerify,
  upload.single("coverimage"),
  updateUserCoverImage);

userRoute.route('/c/:username').get(getUserChannelProfile);
userRoute.route('/watchHistory').get(jwtVerify,getWatchHistory);

export {
  userRoute
}

