import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js";
import {userController} from "../controllers/user.controllers.js"
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
userController);

export {
  userRoute
}

