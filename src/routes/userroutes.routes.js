import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js";

import { changeCurrentPassword, getCurrentUser, loginUser, logoutController, registerUser, updateAccountDetails } from "../controllers/usercontrollers.controllers.js";
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
userRoute.route('/userDetails').get(jwtVerify,getCurrentUser);
userRoute.route('/updatedetails').put(jwtVerify,updateAccountDetails);

export {
  userRoute
}

