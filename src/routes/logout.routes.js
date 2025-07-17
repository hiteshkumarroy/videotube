import { Router } from "express";
import { logoutController } from "../controllers/logoutUser.controllers.js";
const logoutRoute=Router();

logoutRoute.route('/logout').post(logoutController);

export {
  logoutRoute
}
