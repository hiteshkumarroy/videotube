import { Router } from "express";
import { loginUser } from "../controllers/loginUser.controllers.js";
const loginRoute=Router();

loginRoute.route('/login').post(loginUser);

export {
  loginRoute
}

