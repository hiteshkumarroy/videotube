
import { asyncHandler } from "../utils/asyncHandler.js"
import express from 'express';
const app = express();

// Add these before your routes
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary,deleteFromCloudinary} from "../utils/cloudinary.js";
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


const registerUser=asyncHandler( async(req,res)=>{
  let coverimageResponse=null;
  let avatarResponse=null;
 try{
const {username,email,fullname,password}=req.body;

//check if any field is empty
if([username,email,fullname,password].some((item)=>item.trim()===""
)){
  throw new ApiError(500,"all fields required");
}

//check if user already exists
const check= await User.findOne(
{  $or:[{email,username}] });
console.log(check);
if(check){throw new ApiError(400,"username or email already exist")};

//upload images and if images are not there than handle it
const avatarLocalPath=req.files?.avatar[0]?.path;

if(!avatarLocalPath)throw new ApiError(500,"avatar required");

 avatarResponse=await uploadOnCloudinary(avatarLocalPath);
if(!avatarResponse)throw new ApiError(400,"error in uploading avatar on cloudinary");
const coverimageLocalPath=req.files?.coverimage?.[0]?.path;


if(coverimageLocalPath){
coverimageResponse=  await uploadOnCloudinary(coverimageLocalPath);
}

//create user using all fields
const newuser=await User.create({
  username,
  email,
  fullname,
  avatar:avatarResponse.url,
  coverimage: coverimageResponse?.url || "",
  password,
});
const user=User.findById(newuser._id);
if(!user){
  throw new ApiError(400,"error in creating user");
}
//save user in dataBase
// await User.save(newuser);
newuser.save();

//return response using api middleware
res.send(new ApiResponse(200,newuser,"user created successfuly"));
}
catch(error){
console.log(error);
  if(avatarResponse){
   await deleteFromCloudinary(avatarResponse.public_id);
  }
   if(coverimageResponse){
   await deleteFromCloudinary(coverimageResponse.public_id);
   
  }
  throw new ApiError(500,"something went wrong in creating user");
}
})


//new apis
const changeCurrentPassword=asyncHandler(async(req,res)=>{

  try{
const {currentPassword,newPassword}=req.body;
const userId=req.user._id;
const user=await User.findById(userId);
const isCorrect =await user.isPasswordCorrect(currentPassword);

if(!isCorrect)throw new ApiError(400,"current password is incorrect");

user.password=newPassword;
await user.save();

const response=await User.findById(userId).select("-password -refreshtoken");

console.log(response);
if(response.username!=user.username)
 throw new ApiError(400,"error in finding user");


res.status(200).send(new ApiResponse(200,response,"password updated successfuly"));



  }catch(error){

    console.log(error);
res.status(error.statusCode || 500).send(new ApiResponse(error.statusCode || 500,error.message));
  }
})


const getCurrentUser=asyncHandler(async(req,res)=>{

  try{
    const user=req.user;
    const response=await User.findById(user._id).select("-password -refreshtoken");

    res.status(200).send(new ApiResponse(200,response,"here is  user details"));
  }catch(error){
    res.status(error.statusCode || 500).send(new ApiResponse(error.statusCode||500,error.message));
  }

})


const updateAccountDetails=asyncHandler(async(req,res)=>{

  try{
    const user=req.user;
     console.log(req.body);
    const {fullname,email}=req.body;

     if (!fullname || !email) {
      throw new ApiError(400, "All fields are required");
    }
   
    const response=await User.findByIdAndUpdate(
      user._id,
      {
        $set:{
          fullname,
          email
        }
      },{
        new:true
      }
    ).select("-password -refreshtoken");
    
    if(response.username!=user.username){
      throw new ApiError(400,"error in updating user details");
    }

     res.status(200).send(new ApiResponse(200,response,"details updated successfuly"));
  }catch(error){
    res.status(error.statusCode || 500).send(new ApiResponse(error.statusCode,error.message));
  }


})


const updateUserAvatar=asyncHandler(async(req,res)=>{

})


const updateUserCoverImage=asyncHandler(async(req,res)=>{

})

//getuserchannel
//getwatchhistory


export {
  registerUser,
  loginUser,
  generateNewAccessToken,
  logoutController,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage
}