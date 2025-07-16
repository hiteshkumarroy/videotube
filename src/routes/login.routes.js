import { Router } from "express";
import { loginUser } from "../controllers/loginUser.controller.js";
const loginRoute=Router();

loginRoute.route('/login').post(loginUser);

export {
  loginRoute
}

