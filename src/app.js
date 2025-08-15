import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser()); 
app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

//import routes
import { healthcheckRouter } from "./routes/healthcheck.routes.js"; 

import { userRoute } from "./routes/userroutes.routes.js";
import tweetRoutes from "./routes/tweet.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";



app.use("/api/v1/healthcheck",
  healthcheckRouter);
  app.use("/api/v1/user",userRoute);
 
  app.use("/api/v1/tweets",tweetRoutes )
app.use("/api/v1/subscriptions", subscriptionRoutes)
app.use("/api/v1/videos", videoRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/likes", likeRoutes)
app.use("/api/v1/playlist", playlistRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

  

export {app}
