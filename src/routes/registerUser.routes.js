import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js";
import {registerUser} from "../controllers/registerUser.controllers.js"
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

export {
  userRoute
}

