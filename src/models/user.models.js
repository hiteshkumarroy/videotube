// id string pk
// username string*
// email email*
// fullName string*
// avatar string*
// coverimage string*
// password string*
// refreshtoken string*
// watchHistory objectId[] videos*
// createdAt date
// updatedAt date

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=Schema(
  {
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim: true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
    index:true

  },
  avatar:{
type:String,//cloudinaryurl
required:true
  },
  coverimage:{
    type:String,//cloudinaryurl
  },
  password:{
    type:String,
    required:[true,"password is required"],//we can specify here as well the error shown if not given field
  },
  refreshtoken:{
type:String,
  },
  watchhistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
  }]
},

{
  timestamps:true
}
)
//to encrypt password
userSchema.pre("save",async function(next){
if(!this.isModified("password") )return next();
this.password= await bcrypt.hash(this.password,10);
next();
})
//to check is entered password correct
userSchema.methods.isPasswordCorrect=async function(password){

//check here param of comparefn can we swap it??
  return await bcrypt.compare(password,this.password);

}
// generate access token
userSchema.methods.generateAccessToken=function(){
  //short lived access token
return jwt.sign({
  _id:this._id,
  email:this.email,
  username:this.username,
  fullname:this.fullname
},
process.env.ACCESS_TOKEN_SECRET,
{ 
 expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
}

userSchema.methods.genRefreshToken=function(){
return jwt.sign({
  _id:this._id,
},
process.env.REFRESH_TOKEN_SECRET,
{ 
 expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)
} 
export const User=mongoose.model("User",userSchema);