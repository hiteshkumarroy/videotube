import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/ApiResponse.js";
dotenv.config();
const jwtVerify=asyncHandler(async(req,res,next)=>{
  try{
const token=req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");

if(!token){
  throw new ApiError(400,"invalid cookie");
}

const payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

console.log(payload)
if(!payload){
  throw new ApiError(400,"invalid access token");
}

const user=await User.findById(payload?._id).select("-password -refreshtoken");

req.user=user;
next();

  }catch(error){
   res.status(error.statusCode || 500).send(new ApiResponse(error.statusCode,error.message));
  }
})

export {jwtVerify};