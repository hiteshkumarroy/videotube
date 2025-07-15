import {User} from '../models/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {uploadOnCloudinary,deleteFromCloudinary} from "../utils/cloudinary.js";

const userController=asyncHandler( async(req,res)=>{
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


export {userController};