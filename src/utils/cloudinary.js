import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})
const uploadOnCloudinary=async function(localFilePath){
  try{
    if(!localFilePath)return null;
   const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
   fs.unlinkSync(localFilePath);
   console.log("file uploaded successfully and the src is",response.url);
   return response;

  }catch(error){
    fs.unlinkSync(localFilePath);

console.log(error);
  }
}

const deleteFromCloudinary=async(publicId)=>{
  try{
   const result=await cloudinary.uploader.destroy(publicId);
   console.log("deleted from cloudinary",publicId);
  }catch(error){
    console.log("error in deleting from cloudinary",error);
  }
}
export {uploadOnCloudinary,deleteFromCloudinary}