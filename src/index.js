
 import {app } from "./app.js"
 import dotenv from "dotenv"
 import express from "express"
import connect_DB from "./db/index.js"


 dotenv.config({
  path:"./.env",
  override:true
 })

 //common middleware

 app.use(express.json({limit:"16kb"}))
// It takes the raw URL-encoded data from the request body and converts it into a JavaScript object.
 app.use(express.urlencoded({extended:true,limit:"16kb"}))
// express.static("public") is an Express.js middleware function used to serve static files from a specified directory.
// Purpose: It makes files within the designated directory (in this case, "public") directly accessible to clients via HTTP requests. This eliminates the need to create individual routes for each static file (e.g., HTML, CSS, JavaScript, images).
 app.use(express.static("public"))

 const PORT=process.env.PORT || 3000;




connect_DB().then(()=>{
 app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT} `)
 })
}).catch((error)=>{
  console.log("error in connecting mongodb");
})