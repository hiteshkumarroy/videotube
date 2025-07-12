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

export const User=mongoose.model("User",userSchema);