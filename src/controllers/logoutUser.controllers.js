
import { asyncHandler } from "../utils/asyncHandler.js"

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import dotenv from "dotenv";
const logoutController=asyncHandler(async(req,res)=>{
  try{

const user =req.user;
user.refreshtoken="";
await user.save({ validateBeforeSave: false });
const options={
  httpsOnly:true,
  secure:process.env.NODE_ENV,
  sameSite:"strict"
}
return res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.send(new ApiResponse(200,{},"user succesfully logged out"))


  }catch(error){
    throw new ApiError(400,"there is some error in logout");
  }
})
 
export {logoutController}