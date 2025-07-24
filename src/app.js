import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

//import routes
import { healthcheckRouter } from "./routes/healthcheck.routes.js"; 

import { userRoute } from "./routes/userroutes.routes.js";

app.use("/api/v1/healthcheck",
  healthcheckRouter);
  app.use("/api/v1/user",userRoute);

  

export {app}
