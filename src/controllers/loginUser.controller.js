
import { asyncHandler } from "../utils/asyncHandler.js"

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const loginUser=asyncHandler(
  async(req,res)=>{
    try{
     
      //destructuring valuesfrom body

  const {username,email,password}=req.body;

  //validation
    if([username,email].some((val)=>val.trim()==="")){
      throw new ApiError(400,"username and email both required");
    }
///findind either by username or email
    const newUser= await User.findOne({
      $or:[{email},{username}]
    })
//checking
       if(!newUser){
 
      throw new ApiError(400,"username or  email is incorrect");
    }


 
//checking password
   let isValid=await newUser.isPasswordCorrect(password);

   if(!isValid){
    throw new ApiError(400,"password is incorrect please enter correct password");
   }
//generating tokens
   const accesstoken=await newUser.generateAccessToken();
   const refreshtoken=await newUser.genRefreshToken();
   newUser.refreshtoken=refreshtoken;
 //security for cookies
   const options={
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
   }
   //saving in database
await newUser.save();

const loginUser=await User.findById(newUser._id).select("-password -refreshtoken")
   res.
   status(200)
   .cookie("accesstoken",accesstoken,options)
   .cookie("refreshtoken",refreshtoken,options)
   .send(new ApiResponse(200,{accesstoken,refreshtoken,loginUser},"successfuly login user"));
  }
   catch(error){
    console.log(error);
    throw new ApiError(500,"error in login user");
   }

  }
)


const generateNewAccessToken=async(req,res)=>{
  try{
   const token=req.cookies.refreshtoken || req.body.refreshtoken;
  if(!token)throw new ApiError(500,"provide token!!");
let payload;
   try{
   payload=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  }catch(error){
       throw new ApiError(400,"wrong token or expired ");
  }

const user=User.findById(payload?._id);

if(user.refreshtoken!==token) throw new ApiError(400,"wrong token or expired ");

const newToken=await user.genRefreshToken();
user.refreshtoken=newToken;
const accessToken=newToken;
const x={
  httpsOnly:true,
  secure:process.env.NODE_ENV,
  sameSite:"strict"
};

res.status(200)
.cookie("accessToken",accessToken,x)
.cookie("refreshToken",accessToken,x)
.send(new ApiResponse(200,{accessToken},"new token created"));

}
catch(error){
  throw new ApiError(400,"error in creating new token");

}
}

export {loginUser,generateNewAccessToken};