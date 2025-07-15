import express from "express"
import cors from "cors"
import {userRoute} from "./routes/user.routes.js";
import dotenv from "dotenv";

const app=express();

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

//import routes
import { healthcheckRouter } from "./routes/healthcheck.routes.js"; 

app.use("/api/v1/healthcheck",
  healthcheckRouter);
  
  app.use("/api/v1/user",
  userRoute);

export {app}